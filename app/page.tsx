"use client";

import SendIcon from "@/components/icons/SendIcon";
import { Avatar, AvatarGroup, AvatarPicker } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import Hashtag from "@/components/ui/Hashtag";
import IconButton from "@/components/ui/IconButton";
import HeartIcon from "@/components/icons/HeartIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import LikeIcon from "@/components/icons/LikeIcon";
import {
  PageTitle,
  SectionTitle,
  SubTitle,
  SmallTitle,
  BodyText,
  SmallText,
  Label,
} from "@/components/ui/Typography";
import { Input, TextArea } from "@/components/ui/Input";
import AppShell from "@/components/ui/AppShell";
import CommentItem from "@/components/ui/CommentItem";
import PostThread, { Post } from "@/components/ui/PostThread";

const dummyPost: Post = {
  id: "post-1",
  avatarEmoji: "😺",
  name: "Sarah Chen",
  timeAgo: "2 month ago",
  title: "How do you handle bias in meetings?",
  content:
    "I've noticed that my contributions in faculty meetings are often overlooked or attributed to others. Looking for strategies that have worked for you.",
  hashtags: ["#allyship", "#career", "#mentorship"],
  likes: 25,
  helpful: 8,
  comments: [
    {
      id: "c-1",
      avatarEmoji: "👩",
      name: "AllyInTech",
      timeAgo: "1 hour ago",
      content:
        "Absolutely. I think the key is ensuring mentors receive training on inclusive practices, not just technical skills.",
      likes: 15,
      replies: [
        {
          id: "c-1-1",
          avatarEmoji: "🤴",
          name: "ChangeMaker",
          timeAgo: "45 min ago",
          content:
            "Great point! Our org started doing exactly this last quarter and the feedback has been overwhelmingly positive.",
          likes: 8,
          replies: [
            {
              id: "c-1-1-1",
              avatarEmoji: "👧",
              name: "NewVoice",
              timeAgo: "30 min ago",
              content:
                "Would love to hear more about how you structured that training!",
              likes: 3,
            },
          ],
        },
      ],
    },
    {
      id: "c-2",
      avatarEmoji: "👨",
      name: "BridgeBuilder",
      timeAgo: "50 min ago",
      content:
        "Peer mentorship circles have worked well for us — it flattens the hierarchy.",
      likes: 11,
    },
  ],
};

const Sidebar = () => (
  <>
    <Card>
      <CardContent className="space-y-2">
        <CardTitle>Trending Topics</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Hashtag size="md">#mentorship</Hashtag>
          <Hashtag size="md">#allyship</Hashtag>
          <Hashtag size="md">#career</Hashtag>
        </div>
      </CardContent>
    </Card>
  </>
);

export default function Home() {
  return (
    <AppShell
      nickname="Sarah Chen"
      avatarEmoji="😺"
      onPublish={(post) => console.log("Published:", post)}
      sidebar={<Sidebar />}>
      <Button
        variant="primary"
        size="lg"
        leftIcon={<SendIcon className="h-5 w-5" />}>
        Hello World
      </Button>

      <Card className="w-full max-w-md">
        <CardContent className="space-y-2">
          <CardTitle>Messages</CardTitle>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
            doloremque, dolorum aliquid minus porro eos dolorem deserunt quasi
            ratione consequuntur quaerat nostrum eaque perspiciatis praesentium.
            Nobis dolorem explicabo sequi dolor.
          </p>
          <CommentItem
            avatarEmoji="😺"
            name="EquityAdvocate"
            timeAgo="18 days ago"
            content="I've found that preparing a brief agenda beforehand and sharing it helps establish credibility."
            likes={12}
          />
        </CardContent>
      </Card>

      {/* Post Thread */}
      <Card className="w-full max-w-md">
        <CardContent>
          <PostThread
            post={dummyPost}
            onReply={(parentId, content) =>
              console.log("Reply to", parentId, ":", content)
            }
            onLike={(id) => console.log("Liked", id)}
            onHelpful={(id) => console.log("Helpful", id)}
          />
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <AvatarGroup max={3}>
          <Avatar emoji="😺" size="md" />
          <Avatar emoji="😸" size="md" />
        </AvatarGroup>
      </Card>
      <Hashtag size="md">#mentorship</Hashtag>
      {/* Typography */}
      <div className="space-y-3">
        <PageTitle>PageTitle - Main heading</PageTitle>
        <SectionTitle>SectionTitle - Section heading</SectionTitle>
        <SubTitle>SubTitle - Sub section</SubTitle>
        <SmallTitle>SmallTitle - Small heading</SmallTitle>
        <BodyText>
          BodyText - Regular body text for paragraphs and content.
        </BodyText>
        <SmallText>SmallText - Smaller text for captions and hints.</SmallText>
        <Label htmlFor="example">Label - For form inputs</Label>
      </div>

      {/* IconButton */}
      <div className="flex items-center gap-4">
        <IconButton icon={<HeartIcon />} aria-label="Like" count={42} />
        <IconButton icon={<CommentIcon />} aria-label="Comments" count={18} />
        <IconButton
          icon={<LikeIcon />}
          aria-label="Helpful"
          count={15}
          label="helpful"
        />
      </div>

      {/* Input & TextArea */}
      <div className="w-full max-w-md space-y-4">
        <Input name="email" label="Email" placeholder="you@example.com" />
        <Input name="oops" label="Username" error="Already taken" />
        <TextArea
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          description="Max 200 characters"
        />
      </div>
    </AppShell>
  );
}
