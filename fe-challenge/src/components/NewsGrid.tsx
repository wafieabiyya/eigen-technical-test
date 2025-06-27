import type { NewsArticle } from "../types/news";
import { NewsCard } from "../components/NewsCard";
import { List, Skeleton, Typography, Empty } from "antd";

const { Paragraph, Title } = Typography;

interface NewsGridProps {
  articles: NewsArticle[];
  loading: boolean;
}

function NewsCardSkeleton() {
  return (
    <Skeleton
      active
      avatar={{ shape: "square", size: 180 }}
      title
      paragraph={{ rows: 4 }}
    />
  );
}

export function NewsGrid({ articles, loading }: NewsGridProps) {
  if (loading) {
    return (
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 5 }}
        dataSource={Array.from({ length: 6 }, (_, index) => ({
          id: `skeleton-${index}`,
        }))}
        rowKey={(item) => item.id}
        renderItem={() => (
          <List.Item>
            <NewsCardSkeleton />
          </List.Item>
        )}
      />
    );
  }

  if (articles.length === 0) {
    return (
      <Empty
        style={{ padding: "4rem 0" }}
        description={
          <>
            <Title level={5}>No articles found</Title>
            <Paragraph type="secondary">
              Try adjusting your search criteria or filters.
            </Paragraph>
          </>
        }
      />
    );
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 5,
      }}
      dataSource={articles}
      rowKey={(item) => item.url}
      renderItem={(article, index) => (
        <List.Item>
          <NewsCard article={article} index={index} />
        </List.Item>
      )}
    />
  );
}
