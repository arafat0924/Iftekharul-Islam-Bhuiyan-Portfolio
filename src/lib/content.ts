import { useEffect, useState } from "react";
import { defaultContent, type PortfolioContent } from "../data/content";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const response = await fetch("/api/content");

    if (!response.ok) {
        console.warn("API returned non-ok status, using default content");
        return defaultContent;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from /api/content, falling back to default content:", error);
    return defaultContent;
  }
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPortfolioContent()
      .then((data) => {
        if (!cancelled) {
            setContent(data || defaultContent);
        }
      })
      .catch((err) => {
        console.error("Hook fetch error:", err);
        if (!cancelled) setContent(defaultContent);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading, setContent };
}
