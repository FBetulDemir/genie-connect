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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nickname
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <AvatarPicker selected={avatar} onSelect={setAvatar} />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleContinue}
            disabled={!canContinue || loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Creating profile..." : "Continue to GENIE Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}
