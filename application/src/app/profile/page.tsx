import { verifySession } from "@/lib/session";

import { ProfileInfo } from "@/features/profile/components/profile-info"
// import { StatsCard } from "@/features/profile/components/stats-card";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
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
      </div>
    </div>
  )
}
