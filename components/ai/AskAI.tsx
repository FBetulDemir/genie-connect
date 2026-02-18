"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SendIcon from "@/components/icons/SendIcon";
import LogoIcon from "@/components/icons/LogoIcon";

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
      } else {
        setAnswer(data.answer);
      }
    } catch {
      setError("Could not reach AI service. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <LogoIcon className="h-6 w-6" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Ask GENIE AI
          </span>
        </div>

        <p className="text-xs text-[var(--text-secondary)]">
          Get instant advice on gender equality topics
        </p>

        {/* Input + send button */}
        <div className="flex items-center gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="e.g., How to address pay gap concerns?"
            disabled={loading}
            className="text-xs"
            containerClassName="flex-1"
          />
          <Button
            variant="primary"
            size="icon"
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            isLoading={loading}
            leftIcon={!loading ? <SendIcon className="h-4 w-4" /> : undefined}
            className="h-9 w-9 shrink-0"
          />
        </div>

        {/* Answer */}
        {answer && (
          <Card variant="bordered" padding="sm">
            <p className="text-xs leading-relaxed text-[var(--text-body)]">
              {answer}
            </p>
          </Card>
        )}

        {/* Error */}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
