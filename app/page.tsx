import SendIcon from "@/components/icons/SendIcon";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <Button
          variant="primary"
          size="lg"
          leftIcon={<SendIcon className="h-5 w-5" />}>
          Hello World
        </Button>

        <Card className="w-full max-w-md mt-6">
          <h1>Messages</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
            doloremque, dolorum aliquid minus porro eos dolorem deserunt quasi
            ratione consequuntur quaerat nostrum eaque perspiciatis praesentium.
            Nobis dolorem explicabo sequi dolor.
          </p>
        </Card>
      </main>
    </div>
  );
}
