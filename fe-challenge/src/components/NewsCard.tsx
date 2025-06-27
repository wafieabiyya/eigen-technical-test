import type { NewsArticle } from "../types/news";
import { Card, Badge, Button, Typography, Image, Space } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Paragraph, Title } = Typography;

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export function NewsCard({ article, index }: NewsCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNavigate = () => {
    navigate(`/article/${index}`);
  };

  return (
    <Card
      hoverable
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleNavigate}
      cover={
        <Image
          alt={article.title}
          src={article.urlToImage || "/place_holder.png"}
          height={180}
          style={{ objectFit: "cover" }}
          preview={false}
          placeholder
        />
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: "220px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Space direction="vertical" size="small" style={{ flexGrow: 1 }}>
          <Badge
            count={article.source.name}
            style={{ backgroundColor: "#d9d9d9", color: "#333" }}
          />

          <Title level={5} ellipsis={{ rows: 2 }}>
            {article.title}
          </Title>

          <Paragraph type="secondary" ellipsis={{ rows: 3 }}>
            {article.description || "\u00A0"}
          </Paragraph>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#888",
              fontSize: "0.875rem",
            }}
          >
            <span>
              <CalendarOutlined style={{ marginRight: 4 }} />
              {formatDate(article.publishedAt)}
            </span>
            {article.author && (
              <span
                style={{
                  maxWidth: "130px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <UserOutlined style={{ marginRight: 4 }} />
                {article.author}
              </span>
            )}
          </div>
        </Space>

        <Button
          block
          icon={<LinkOutlined />}
          onClick={() => window.open(article.url, "_blank")}
          style={{ marginTop: "20px" }}
        >
          Read Full Article
        </Button>
      </div>
    </Card>
  );
}
