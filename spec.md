# StreamForge - Live Streaming Platform

## Current State
New project, no existing code.

## Requested Changes (Diff)

### Add
- Live streaming dashboard (StreamLabs-style) with stream setup, controls, and preview
- Game streaming with quality selection: 1080p and 4K options
- Pre-made streaming presets: Landscape (16:9) and Portrait/Horizontal (9:16)
- Stream channel pages where viewers can watch streams
- Subscription system at 50 INR/month (via Stripe) to unlock streaming
- User authentication and profile management
- Stream settings: title, game category, quality, preset selection
- Live viewer count, stream status indicators
- Stream history and past broadcasts
- Streamer dashboard with stats (viewers, followers, stream time)
- Browse/discover page for active streams
- Follower system
- Chat overlay UI (simulated)

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: User profiles, stream sessions, follower system, subscription status, stream presets
2. Stripe integration for 50 INR/month subscription
3. Authorization for streamer vs viewer roles
4. Blob storage for stream thumbnails and profile avatars
5. Frontend: Multi-page app with Dashboard, Go Live, Browse, Channel, Settings pages
6. Stream setup wizard with quality + preset selection
7. Simulated live stream UI (WebRTC simulation with canvas-based preview)
