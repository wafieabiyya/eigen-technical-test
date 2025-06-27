import type { NewsResponse, NewsFilters } from "../types/news";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

export class NewsApiService {
  private static buildUrl(endpoint: string, params: NewsFilters): string {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.searchParams.append("apiKey", API_KEY);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value.toString());
      }
    });

    return url.toString();
  }

  static async getTopHeadlines(
    filters: NewsFilters = {},
  ): Promise<NewsResponse> {
    const url = this.buildUrl("top-headlines", {
      country: "us",
      pageSize: 20,
      ...filters,
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    return response.json();
  }

  static async searchEverything(filters: NewsFilters): Promise<NewsResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { country, ...restFilters } = filters;

    const url = this.buildUrl("everything", {
      sortBy: "publishedAt",
      pageSize: 20,
      ...restFilters,
    });

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to search news: ${response.statusText}`);
    }

    return response.json();
  }
}
