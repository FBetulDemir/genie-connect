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

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="space-y-6">
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
              ratione consequuntur quaerat nostrum eaque perspiciatis
              praesentium. Nobis dolorem explicabo sequi dolor.
            </p>
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
          <BodyText>BodyText - Regular body text for paragraphs and content.</BodyText>
          <SmallText>SmallText - Smaller text for captions and hints.</SmallText>
          <Label htmlFor="example">Label - For form inputs</Label>
        </div>

        {/* IconButton */}
        <div className="flex items-center gap-4">
          <IconButton icon={<HeartIcon />} aria-label="Like" count={42} />
          <IconButton icon={<CommentIcon />} aria-label="Comments" count={18} />
          <IconButton icon={<LikeIcon />} aria-label="Helpful" count={15} label="helpful" />
        </div>
      </main>
    </div>
  );
}
