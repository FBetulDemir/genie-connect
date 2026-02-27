# Agora

**A Digital Forum for Equality in Academia**

Live demo: [agora-connect.vercel.app](https://agora-connect.vercel.app)

Agora is a community platform designed to support open and respectful dialogue around gender equality in academia. Users can share experiences, ask questions, and engage in discussions — anonymously or under a chosen nickname.

---

## Features

- **Anonymous posting** — publish without revealing your identity
- **Threaded comments** — nested replies for structured discussions
- **Hashtag filtering** — browse topics via clickable hashtags
- **Word cloud** — dynamic visualization of trending hashtags
- **Resource Hub** — curated articles and external resources on gender equality
- **AI assistant** — ask questions and get contextual guidance via Gemini
- **Light / dark theme** — toggle with preference saved across sessions
- **Profile system** — choose a nickname and avatar emoji, no account required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| AI | Google Gemini API (`@google/genai`) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key (for Gemini)

### Installation

```bash
git clone https://github.com/FBetulDemir/Agora.git
cd agora
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Schema

The following tables are used in Supabase (PostgreSQL):

| Table | Description |
|---|---|
| `profiles` | User nickname and avatar emoji |
| `posts` | Forum posts with optional anonymous flag |
| `comments` | Threaded comments linked to posts |
| `post_likes` | Like interactions on posts |
| `post_helpfuls` | "Helpful" interactions on posts |

Row Level Security (RLS) is enabled on all tables.

---

## Project Structure

```
app/               # Next.js App Router pages
components/
  feed/            # PostCard, PostThread, CreatePost, CommentItem
  layout/          # Navbar, Sidebar, AppShell
  ui/              # Button, Input, Avatar, ThemeToggle, ...
  hashtags/        # WordCloud
  profile/         # ProfileCard
  resource-hub/    # ResourceHub
  ai/              # AskAI (Gemini integration)
lib/               # Supabase client, posts, comments, profile logic
```

---

## Deployment

The app is deployed on [Vercel](https://vercel.com). Add the environment variables above in your Vercel project settings.

---

## License

This project was developed as a thesis project at Chalmers University of Technology.
