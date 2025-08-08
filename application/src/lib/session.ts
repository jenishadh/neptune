import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import type { SessionPayload } from '@/features/auth/schemas';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

// Encrypt the session
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

// Decrypt the session
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

// Create a new session
export async function createSession(userId: string, userRole: "admin" | "user") {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const session = await encrypt({ userId, userRole, expiresAt });

  cookieStore.set('session', session, {
    httpOnly: true, // only accessible by the server
    secure: true, // only sent over HTTPS
    expires: expiresAt, // set the expiration date
    sameSite: 'lax', // allow the cookie to be sent with cross-site requests
    path: '/', // set the cookie path
  });
}

// Verify the session
export async function verifySession() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  if (!session || !session.userId) {
    return { isAuth: false, userId: null, userRole: null };
  }

  return { isAuth: true, userId: String(session.userId), userRole: session.userRole };
}

// Delete the session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}