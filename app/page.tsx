import SendIcon from "@/components/icons/SendIcon";
import { Avatar, AvatarGroup, AvatarPicker } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

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
      </main>
    </div>
  );
}
