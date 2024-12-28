import React, { useState } from "react";
import API from "../api";

const CreatePost = () => {
  //   const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    console.log(`Token: ` + token);

    API.post("social/posts/", formData)
      .then((response) => {
        console.log("Post created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        if (error.response) {
          // Отговорът от сървъра
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          // Заявката е изпратена, но не е получен отговор
          console.log("Request data:", error.request);
        } else {
          // Други грешки, свързани с настройките на заявката
          console.log("Error message:", error.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div> */}
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
