import { useEffect, useState } from "react";
import { defaultContent, type PortfolioContent } from "../data/content";

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const response = await fetch("/api/content");

  if (!response.ok) {
    throw new Error("Unable to load portfolio content");
  }

  return response.json();
}

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPortfolioContent()
      .then((data) => {
        if (!cancelled) setContent(data);
      })
      .catch(() => {
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
