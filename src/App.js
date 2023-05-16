import "./App.css";
import { Typography, Input, List, Card, Image } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");
  const [dataFromServer, setDataFromServer] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    //API CALL
    setLoading(true);
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
      .then((res) => res.json())
      .then((response) => {
        setDataFromServer(response.products);
        setLoading(false);
      });
  }, [searchText]);

  return (
    <>
      <Typography.Title
        style={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Photo Gallery...!
      </Typography.Title>

      <Input.Search
        style={{
          maxWidth: "500px",
          display: "flex",
          margin: "auto",
        }}
        placeholder="Search Product"
        onSearch={(value) => {
          setSearchText(value);
        }}
        allowClear
      ></Input.Search>

      <Typography.Text style={{ marginTop: "30px" }}>
        Showing results for: {searchText || "All"}{" "}
      </Typography.Text>
      <List
        loading={loading}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
        dataSource={dataFromServer}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              title={item.title}
              style={{ height: 400, margin: 12, overflow: "hidden" }}
            >
              <Image src={item.thumbnail} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}

export default App;
