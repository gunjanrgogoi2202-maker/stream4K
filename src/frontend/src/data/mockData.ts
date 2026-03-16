export interface Stream {
  id: string;
  title: string;
  streamer: string;
  streamerAvatar: string;
  game: string;
  category: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  duration: string;
  quality: "1080p" | "4K";
  tags: string[];
  description: string;
  followers: number;
  startedAt: string;
}

export const MOCK_STREAMS: Stream[] = [
  {
    id: "s1",
    title: "VALORANT Ranked Grind — Diamond Pushing!",
    streamer: "NightHawkFPS",
    streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NightHawk",
    game: "VALORANT",
    category: "FPS",
    viewers: 14320,
    thumbnail: "/assets/generated/stream-thumb-fps.dim_640x360.jpg",
    isLive: true,
    duration: "3:42:11",
    quality: "1080p",
    tags: ["FPS", "Ranked", "Competitive"],
    description:
      "Diamond push live! Watch me grind through the toughest lobbies. Drop a follow and let's climb together!",
    followers: 87400,
    startedAt: "2026-03-16T10:00:00Z",
  },
  {
    id: "s2",
    title: "PUBG Solo Squads — 30+ Kill Challenge",
    streamer: "StormRider_BR",
    streamerAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=StormRider",
    game: "PUBG: Battlegrounds",
    category: "Battle Royale",
    viewers: 22180,
    thumbnail: "/assets/generated/stream-thumb-br.dim_640x360.jpg",
    isLive: true,
    duration: "5:12:05",
    quality: "4K",
    tags: ["Battle Royale", "Challenge", "Solo"],
    description:
      "Going for 30 kills solo vs squads every match. Super Sus plays only.",
    followers: 156200,
    startedAt: "2026-03-16T08:00:00Z",
  },
  {
    id: "s3",
    title: "Elden Ring DLC — First Playthrough No Deaths",
    streamer: "LoreMasterX",
    streamerAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=LoreMaster",
    game: "Elden Ring",
    category: "RPG",
    viewers: 9870,
    thumbnail: "/assets/generated/stream-thumb-rpg.dim_640x360.jpg",
    isLive: true,
    duration: "1:20:44",
    quality: "4K",
    tags: ["RPG", "Soulslike", "Challenge"],
    description:
      "Taking on the Shadow of the Erdtree DLC completely fresh, no deaths allowed or I restart.",
    followers: 43100,
    startedAt: "2026-03-16T12:30:00Z",
  },
  {
    id: "s4",
    title: "Mobile Legends Grandmaster Push | ₹50 Subs = 1 game!",
    streamer: "MobileKing_India",
    streamerAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=MobileKing",
    game: "Mobile Legends: Bang Bang",
    category: "Mobile",
    viewers: 31450,
    thumbnail: "/assets/generated/stream-thumb-mobile.dim_640x360.jpg",
    isLive: true,
    duration: "2:55:00",
    quality: "1080p",
    tags: ["Mobile", "MOBA", "Ranked"],
    description:
      "India's top Mobile Legends streamer is live! Sub games happening every hour.",
    followers: 241000,
    startedAt: "2026-03-16T09:00:00Z",
  },
  {
    id: "s5",
    title: "Gran Turismo 7 — Rain Racing Masterclass",
    streamer: "VelocityDrifter",
    streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Velocity",
    game: "Gran Turismo 7",
    category: "Racing",
    viewers: 5230,
    thumbnail: "/assets/generated/stream-thumb-racing.dim_640x360.jpg",
    isLive: true,
    duration: "0:47:22",
    quality: "4K",
    tags: ["Racing", "Simulation", "4K"],
    description:
      "4K streaming the most realistic rain racing ever. Every drop counts.",
    followers: 28700,
    startedAt: "2026-03-16T13:00:00Z",
  },
  {
    id: "s6",
    title: "CS2 Pro Warmup — Road to Global Elite",
    streamer: "PrecisionAim_CS",
    streamerAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=PrecisionAim",
    game: "Counter-Strike 2",
    category: "FPS",
    viewers: 18920,
    thumbnail: "/assets/generated/stream-thumb-fps.dim_640x360.jpg",
    isLive: false,
    duration: "4:30:00",
    quality: "1080p",
    tags: ["FPS", "Esports", "CS2"],
    description:
      "VOD: Full session climbing to Global Elite. Includes warmup routines and clutch moments.",
    followers: 112300,
    startedAt: "2026-03-15T15:00:00Z",
  },
  {
    id: "s7",
    title: "Free Fire Max Tournament Highlights",
    streamer: "FireStorm_FF",
    streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FireStorm",
    game: "Free Fire Max",
    category: "Battle Royale",
    viewers: 44100,
    thumbnail: "/assets/generated/stream-thumb-br.dim_640x360.jpg",
    isLive: false,
    duration: "6:10:00",
    quality: "1080p",
    tags: ["Mobile", "Tournament", "Free Fire"],
    description:
      "Full tournament VOD with all the highlights, wins, and big clutch moments.",
    followers: 389000,
    startedAt: "2026-03-14T11:00:00Z",
  },
  {
    id: "s8",
    title: "Minecraft Hardcore S3 — 100 Days Challenge",
    streamer: "CraftMasterPro",
    streamerAvatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=CraftMaster",
    game: "Minecraft",
    category: "Survival",
    viewers: 7650,
    thumbnail: "/assets/generated/stream-thumb-rpg.dim_640x360.jpg",
    isLive: true,
    duration: "7:00:15",
    quality: "1080p",
    tags: ["Survival", "Hardcore", "Challenge"],
    description:
      "Day 73 of my hardcore 100-day challenge. One mistake and it's over!",
    followers: 56800,
    startedAt: "2026-03-16T06:00:00Z",
  },
];

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  color: string;
  isSubscriber: boolean;
  timestamp: Date;
}

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: "c1",
    user: "SpeedRunner42",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Speed",
    message: "LETS GOOO! Love this stream!",
    color: "#ff6b35",
    isSubscriber: true,
    timestamp: new Date(),
  },
  {
    id: "c2",
    user: "GamingLegend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Legend",
    message: "That clutch was insane!",
    color: "#a855f7",
    isSubscriber: false,
    timestamp: new Date(),
  },
  {
    id: "c3",
    user: "NightOwl_99",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Owl",
    message: "POG PogChamp",
    color: "#22d3ee",
    isSubscriber: true,
    timestamp: new Date(),
  },
  {
    id: "c4",
    user: "ProViewer_IN",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProViewer",
    message: "How do you aim like that? Tutorial please!",
    color: "#4ade80",
    isSubscriber: false,
    timestamp: new Date(),
  },
  {
    id: "c5",
    user: "StreamFan_X",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fan",
    message: "Subscribed! ₹50 well spent lmao",
    color: "#fbbf24",
    isSubscriber: true,
    timestamp: new Date(),
  },
  {
    id: "c6",
    user: "CriticalHit_",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Critical",
    message: "HEADSHOT! Let's go!",
    color: "#f43f5e",
    isSubscriber: false,
    timestamp: new Date(),
  },
  {
    id: "c7",
    user: "EliteGamer_007",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elite",
    message: "This 4K quality is 🔥🔥🔥",
    color: "#818cf8",
    isSubscriber: true,
    timestamp: new Date(),
  },
  {
    id: "c8",
    user: "NewbiePro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Newbie",
    message: "First time watching, this is sick!",
    color: "#34d399",
    isSubscriber: false,
    timestamp: new Date(),
  },
];

export const CHAT_BOTS = [
  {
    user: "HypeBot",
    color: "#ff6b35",
    messages: [
      "PogChamp PogChamp PogChamp",
      "That was INSANE!",
      "W player!",
      "Let's GOOO!",
    ],
  },
  {
    user: "ViewerX",
    color: "#a855f7",
    messages: [
      "Clutch!!",
      "No way that worked",
      "OMEGALUL",
      "Teach me that move!",
    ],
  },
  {
    user: "FanGirl_IN",
    color: "#22d3ee",
    messages: [
      "Watching from Bangalore!",
      "Best streamer on StreamForge",
      "Subbing now!",
      "More content pls!",
    ],
  },
  {
    user: "TrueGamer",
    color: "#4ade80",
    messages: [
      "This is actually cracked",
      "How are you so good?",
      "Drop those settings!",
      "New meta discovered",
    ],
  },
];
