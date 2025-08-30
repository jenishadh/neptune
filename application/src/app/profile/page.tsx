import { verifySession } from "@/lib/session";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProfileInfo } from "@/features/profile/components/profile-info"
import { getUserById } from "@/features/auth/queries";
import { SavedSongs } from "@/features/profile/components/saved-songs";
import { getSavedSongs } from "@/features/profile/queries";

export default async function ProfilePage() {
  const { userId } = await verifySession();

  if (!userId) {
    return null;
  }

  const userData = await getUserById(userId);

  if (!userData) {
    return null;
  }

  const savedSongs = await getSavedSongs(userId)

  return (
    <section className='py-6 md:py-10'>
      <MaxWidthWrapper>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ProfileInfo userData={{
              id: userData.id,
              name: userData.name,
              email: userData.email,
              joinDate: userData.createdAt
            }} />
          </div>

          <SavedSongs
            userId={userId}
            savedSongs={savedSongs}
          />

        </div>
      </MaxWidthWrapper>
    </section>
  )
}
