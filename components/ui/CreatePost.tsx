"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Input, TextArea } from "./Input";
import Button from "./Button";
import Toggle from "./Toggle";
import PlusIcon from "../icons/PlusIcon";
import SendIcon from "../icons/SendIcon";
import EyeOffIcon from "../icons/EyeOffIcon";
import { createPost } from "@/lib/posts";
import { useToast } from "./Toast";

export type CreatePostData = {
  title: string;
  content: string;
  hashtags: string[];
  anonymous: boolean;
};

type CreatePostProps = {
  onPublished?: (post: CreatePostData) => void;
};

const AUTHOR_ID = 1; // hardcoded profile for now

const CreatePost = ({ onPublished }: CreatePostProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const canPublish =
    title.trim().length > 0 &&
    content.trim().length > 0 &&
    hashtags.trim().length > 0;

  const parseHashtags = (raw: string): string[] =>
    raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

  const handlePublish = async () => {
    if (!canPublish) return;

    const parsed = parseHashtags(hashtags);
    setLoading(true);

    try {
      await createPost({
        authorId: AUTHOR_ID,
        title: title.trim(),
        content: content.trim(),
        hashtags: parsed,
        isAnonymous: anonymous,
      });

      const postData: CreatePostData = {
        title: title.trim(),
        content: content.trim(),
        hashtags: parsed,
        anonymous,
      };

      toast("Post published!", "success");
      onPublished?.(postData);
      setTitle("");
      setContent("");
      setHashtags("");
      setAnonymous(false);
      setOpen(false);
    } catch (err) {
      console.error("Failed to create post:", err);
      toast("Failed to publish post. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        leftIcon={<PlusIcon className="h-4 w-4" />}
        onClick={() => setOpen(true)}>
        New Post
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Create Post
        </h2>
        <div className="space-y-4">
          <Input
            name="title"
            label="Title"
            placeholder="What's on your mind?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            name="content"
            label="Content"
            placeholder="Share your thoughts, experiences, or questions..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            name="hashtags"
            label="Hashtags"
            placeholder="e.g., GenderEquality, mentorship, career"
            description="Separate multiple hashtags with commas"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Toggle
              checked={anonymous}
              onChange={setAnonymous}
              label="Post anonymously"
              description="Your identity will be hidden"
            />
            {anonymous && (
              <EyeOffIcon className="h-4 w-4 text-[var(--text-muted)]" />
            )}
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              leftIcon={<SendIcon className="h-4 w-4" />}
              disabled={!canPublish}
              isLoading={loading}
              onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
