import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import type { NewsArticle } from "../types/news";
import { Typography, Card, Image, Button, Flex, Spin } from "antd";
import { LinkOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { NewsApiService } from "../services/news";

const { Title, Paragraph, Text } = Typography;

export default function NewsDetail() {
  const { index } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const data = await NewsApiService.getTopHeadlines();
      if (data && index !== undefined) {
        setArticle(data.articles[parseInt(index)]);
      }
    };
    fetch();
  }, [index]);

  if (!article) {
    return (
      <Flex justify="center" align="center" style={{ height: "50vh" }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex justify="center" style={{ padding: "2rem" }}>
      <Card style={{ maxWidth: 800, width: "100%" }} bordered={false}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ marginBottom: "1rem", paddingLeft: 0 }}
        >
          Back
        </Button>

        {article.urlToImage && (
          <Image
            src={article.urlToImage}
            alt={article.title}
            style={{
              borderRadius: "8px",
              maxHeight: 400,
              objectFit: "cover",
              width: "100%",
            }}
            preview={false}
          />
        )}

        <Flex vertical gap="1.5rem" style={{ marginTop: "1.5rem" }}>
          <Title level={3}>{article.title}</Title>

          {article.author && (
            <Text type="secondary">
              By <strong>{article.author}</strong>
            </Text>
          )}

          <Paragraph>{article.description}</Paragraph>

          {article.content && (
            <Paragraph ellipsis={{ rows: 6, expandable: true }}>
              {article.content}
            </Paragraph>
          )}

          <Button
            block
            icon={<LinkOutlined />}
            onClick={() => window.open(article.url, "_blank")}
          >
            Read Full Article
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
