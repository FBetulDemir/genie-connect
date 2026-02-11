"use client";

import { useState } from "react";
import Modal from "./Modal";
import { Input, TextArea } from "./Input";
import Button from "./Button";
import PlusIcon from "../icons/PlusIcon";
import SendIcon from "../icons/SendIcon";

type CreatePostProps = {
  onPublish?: (post: { content: string; hashtag: string }) => void;
};

const CreatePost = ({ onPublish }: CreatePostProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [hashtag, setHashtag] = useState("");

  const canPublish = content.trim().length > 0 && hashtag.trim().length > 0;

  const handlePublish = () => {
    if (!canPublish) return;
    onPublish?.({ content: content.trim(), hashtag: hashtag.trim() });
    setContent("");
    setHashtag("");
    setOpen(false);
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
          <TextArea
            name="content"
            placeholder="Share your thoughts, experiences, or questions..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Input
            name="hashtag"
            label="Add Hashtag"
            placeholder="e.g., GenderEquality"
            description="Every post needs at least one hashtag"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              leftIcon={<SendIcon className="h-4 w-4" />}
              disabled={!canPublish}
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
