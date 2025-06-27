import React, { useState } from "react";
import { Alert, Typography } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import { useNews } from "./hooks/useNews";
import { NewsFilters } from "./components/NewsFilters";
import { NewsGrid } from "./components/NewsGrid";
import type { NewsFilters as NewsFiltersType } from "./types/news";

const { Title } = Typography;

function App() {
  const [filters, setFilters] = useState<NewsFiltersType>({});
  const { articles, loading, error } = useNews(filters);

  return (
    <React.Fragment>
      <main
        style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem" }}
      >
        <Title level={2}>Daily Updated News</Title>

        <NewsFilters onFiltersChange={setFilters} loading={loading} />

        {error && (
          <Alert
            type="error"
            showIcon
            icon={<AlertOutlined />}
            message="Something went wrong"
            description={`${error}. Please check your API key configuration.`}
            style={{ marginBottom: 24 }}
          />
        )}

        <NewsGrid articles={articles} loading={loading} />
      </main>
    </React.Fragment>
  );
}

export default App;
