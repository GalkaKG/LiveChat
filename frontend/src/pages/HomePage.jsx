import React, { useEffect, useState } from "react";
import API from "../api";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post" style={{ width: "100%" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
