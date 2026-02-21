"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/Card";
import BookIcon from "@/components/icons/BookIcon";
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon";

type Article = {
  title: string;
  source: string;
  url: string;
  tag: string;
};

const articles: Article[] = [
  {
    title: "Ten Essential Steps to Achieve Gender Equality in Academia",
    source: "Nature",
    url: "https://www.nature.com/articles/s44185-025-00105-6",
    tag: "Research",
  },
  {
    title: "Women in STEM: The Importance of Mentorship and Community",
    source: "ASM.org",
    url: "https://asm.org/articles/2024/october/women-stem-importance-mentorship-community",
    tag: "Mentorship",
  },
  {
    title: "Through the Glass Ceiling: The Quest for Gender Equality",
    source: "PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11332561/",
    tag: "Career",
  },
  {
    title: "Gender Bias in Academia: A Lifetime Problem That Needs Solutions",
    source: "PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8553227/",
    tag: "Awareness",
  },
  {
    title: "5 Tips for Women in STEM to Grow Their Careers",
    source: "Jenn Donahue",
    url: "https://www.jenndonahue.com/blog/how-women-can-succeed-in-stem-careers",
    tag: "Advice",
  },
];

// tagging colors so each article has a distinct look
const tagColors: Record<string, string> = {
  Research: "text-[#51A2FF] bg-[#51A2FF]/10",
  Mentorship: "text-[#A78BFA] bg-[#A78BFA]/10",
  Career: "text-[#34D399] bg-[#34D399]/10",
  Awareness: "text-[#FF637E] bg-[#FF637E]/10",
  Advice: "text-[#FFB900] bg-[#FFB900]/10",
};

export default function ResourceHub() {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <BookIcon className="h-5 w-5 text-[var(--accent-blue-400)]" />
          <CardTitle>Resource Hub</CardTitle>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Articles and resources to support your journey
        </p>

        <div className="space-y-2">
          {articles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg border border-[var(--border-card-default)] bg-[var(--surface)] p-3 transition-colors hover:border-[var(--accent-blue-500)]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-blue-400)] transition-colors line-clamp-2">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-[0.65rem] font-medium px-1.5 py-0.5 rounded-full ${tagColors[article.tag] ?? ""}`}>
                    {article.tag}
                  </span>
                  <span className="text-[0.65rem] text-[var(--text-muted)]">
                    {article.source}
                  </span>
                </div>
              </div>
              <ExternalLinkIcon className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-blue-400)] shrink-0 mt-0.5 transition-colors" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
