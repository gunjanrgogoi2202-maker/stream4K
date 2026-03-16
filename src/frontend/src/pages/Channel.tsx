import { StreamCard } from "@/components/StreamCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";
import { MOCK_STREAMS } from "@/data/mockData";
import { useParams } from "@tanstack/react-router";
import { Heart, Play, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function Channel() {
  const { username } = useParams({ from: "/channel/$username" });
  const { isLoggedIn } = useApp();
  const [following, setFollowing] = useState(false);

  const channelStreams = MOCK_STREAMS.filter((s) => s.streamer === username);
  const stream = channelStreams[0] ?? MOCK_STREAMS[0];

  const channelData = {
    username: username ?? stream.streamer,
    displayName: username ?? stream.streamer,
    avatar: stream.streamerAvatar,
    banner: "/assets/generated/channel-banner.dim_1200x300.jpg",
    bio: `Professional ${stream.category} streamer. Grinding ranked every day and sharing the journey with ${formatNum(stream.followers)} amazing followers. Sub to support and unlock all premium features!`,
    followers: stream.followers,
    totalViews: stream.viewers * 142,
    memberSince: "January 2023",
    category: stream.category,
  };

  const allStreams = MOCK_STREAMS.filter(
    (s) => s.category === stream.category || Math.random() > 0.5,
  ).slice(0, 6);

  return (
    <div className="pb-8">
      {/* Banner */}
      <div className="relative h-36 lg:h-48 overflow-hidden">
        <img
          src={channelData.banner}
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Channel Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 lg:px-6"
      >
        <div className="flex items-end gap-4 -mt-10 mb-4">
          <img
            src={channelData.avatar}
            alt={channelData.displayName}
            className="w-20 h-20 rounded-full border-4 border-background bg-card shadow-xl flex-shrink-0"
          />
          <div className="flex-1 min-w-0 pb-1">
            <h1 className="font-display font-bold text-xl lg:text-2xl">
              {channelData.displayName}
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Users className="w-3.5 h-3.5" />
              {formatNum(channelData.followers)} followers
            </p>
          </div>
          <Button
            data-ocid="stream.follow_button"
            onClick={() => isLoggedIn && setFollowing((f) => !f)}
            className={`flex-shrink-0 mb-1 ${following ? "bg-muted text-foreground border border-border" : "bg-primary hover:bg-primary/80"}`}
          >
            <Heart
              className={`w-4 h-4 mr-1.5 ${following ? "fill-current text-primary" : ""}`}
            />
            {following ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos">
          <TabsList className="bg-muted border border-border mb-6">
            <TabsTrigger value="live" data-ocid="channel.live.tab">
              Live
            </TabsTrigger>
            <TabsTrigger value="videos" data-ocid="channel.videos.tab">
              Videos
            </TabsTrigger>
            <TabsTrigger value="about" data-ocid="channel.about.tab">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            {channelStreams.filter((s) => s.isLive).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {channelStreams
                  .filter((s) => s.isLive)
                  .map((s, i) => (
                    <StreamCard key={s.id} stream={s} index={i + 1} />
                  ))}
              </div>
            ) : (
              <div
                data-ocid="channel.live.empty_state"
                className="text-center py-16"
              >
                <Play className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Not currently live</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allStreams.map((s, i) => (
                <StreamCard key={s.id} stream={s} index={i + 1} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="max-w-2xl space-y-6">
              <div className="p-5 bg-card rounded-xl border border-border">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {channelData.bio}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: "Followers",
                    value: formatNum(channelData.followers),
                  },
                  {
                    label: "Total Views",
                    value: formatNum(channelData.totalViews),
                  },
                  { label: "Member Since", value: channelData.memberSince },
                  { label: "Main Game", value: stream.game },
                  { label: "Category", value: channelData.category },
                  { label: "Quality", value: stream.quality },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 bg-card rounded-xl border border-border"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-semibold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
