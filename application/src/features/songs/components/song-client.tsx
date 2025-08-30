"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

import { save } from "@/features/songs/actions";
import { remove } from "@/features/songs/actions";
import { SongClientProps } from "@/features/songs/schemas";

export default function SongClient({ song, isAlreadySaved }: SongClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(isAlreadySaved);

  async function saveSong() {
    startTransition(async () => {
      const result = await save({
        userId: song.userId,
        songId: song.id,
      });
      toast(result.message);
      if (result?.success) {
        setIsSaved(true);
      }
    });
  }

  async function removeSong() {
    startTransition(async () => {
      const result = await remove({
        userId: song.userId,
        songId: song.id,
      });
      toast(result.message);
      if (result?.success) {
        setIsSaved(false);
      }
    });
  }

  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.back()} variant="outline">
        Back
      </Button>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{song.title}</CardTitle>
          <CardDescription className="text-lg">{song.artist}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Album</span>
                <span className="text-gray-900">{song.album}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Year</span>
                <span className="text-gray-900">{song.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Duration</span>
                <span className="text-gray-900">{song.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Genre</span>
                <Badge variant="outline" className="text-gray-600 border-gray-300">
                  {song.genre}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Link
                href={song.url}
                target="_blank"
                className={buttonVariants()}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Youtube
              </Link>
              {!isSaved && (
                <form action={saveSong}>
                  <Button type="submit" disabled={isPending}>
                    {isPending && <Icons.loaderCircle className="size-4 animate-spin" />}{" "}
                    Save                      
                  </Button>
                </form>
              )}
              {isSaved && (
                <form action={removeSong}>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={isPending}
                  >
                    {isPending && <Icons.loaderCircle className="size-4 animate-spin" />}{" "}
                    Remove
                  </Button>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}