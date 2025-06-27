"use client";

import { useState, useEffect } from "react";
import type { NewsArticle, NewsFilters } from "../types/news";
import { NewsApiService } from "../services/news";

export function useNews(filters: NewsFilters = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = filters.q
          ? await NewsApiService.searchEverything(filters)
          : await NewsApiService.getTopHeadlines(filters);

        setArticles(response.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [filters]);

  return { articles, loading, error };
}
