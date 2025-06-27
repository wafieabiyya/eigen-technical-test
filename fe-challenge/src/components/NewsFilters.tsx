import { useState } from "react";
import { Input, Select, Button, Row, Col, Card } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import type { NewsFilters } from "../types/news";

interface NewsFiltersProps {
  onFiltersChange: (filters: NewsFilters) => void;
  loading?: boolean;
}

const { Option } = Select;

const categories = [
  { value: "all", label: "All Categories" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "general", label: "General" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

const countries = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

export function NewsFilters({ onFiltersChange, loading }: NewsFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [country, setCountry] = useState("us");

  const handleSearch = () => {
    onFiltersChange({
      q: searchQuery || undefined,
      category: category !== "all" ? category : undefined,
      country,
    });
  };

  return (
    <Card style={{ marginBottom: "1.5rem" }} variant="outlined">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={10}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch}
            allowClear
          />
        </Col>

        <Col xs={24} sm={12} md={6} lg={5}>
          <Select
            value={category}
            onChange={setCategory}
            style={{ width: "100%" }}
            placeholder="Category"
          >
            {categories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={6} lg={5}>
          <Select
            value={country}
            onChange={setCountry}
            style={{ width: "100%" }}
            placeholder="Country"
          >
            {countries.map((c) => (
              <Option key={c.value} value={c.value}>
                {c.label}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={6} lg={4}>
          <Button
            type="primary"
            style={{ width: "100%", backgroundColor: "#111111" }}
            icon={<FilterOutlined />}
            onClick={handleSearch}
            loading={loading}
            block
          >
            Filter
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default NewsFilters;
