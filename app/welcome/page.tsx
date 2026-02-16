"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoIcon from "@/components/icons/LogoIcon";
import { AvatarPicker } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createProfile } from "@/lib/profile";

export default function WelcomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canContinue = nickname.trim().length > 0 && avatar.length > 0;

  const handleContinue = async () => {
    if (!canContinue) return;
    setLoading(true);
    setError("");

    try {
      await createProfile(nickname.trim(), avatar);
      router.push("/");
    } catch (err) {
      console.error("Failed to create profile:", err);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--accent-blue-600)] to-[var(--accent-blue-400)] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <LogoIcon className="h-16 w-16 mb-4" />
          <h1 className="text-xl font-bold text-gray-900">
            Welcome to GENIE Connect
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your profile to get started
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Input
            name="nickname"
            label="Nickname"
            placeholder="Enter your nickname..."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={error}
            className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
          />

          <AvatarPicker selected={avatar} onSelect={setAvatar} />

          <Button
            variant="primary"
            size="lg"
            className="w-full h-12"
            disabled={!canContinue}
            isLoading={loading}
            onClick={handleContinue}>
            Continue to GENIE Connect
          </Button>
        </div>
      </div>
    </div>
  );
}
