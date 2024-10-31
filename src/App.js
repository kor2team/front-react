import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./RecipeList";

function App() {
  const posts = [
    {
      id: 1,
      title: "김치찜",
      content: "김치찜 레시피",
    },
    {
      id: 2,
      title: "갈비찜",
      content: "갈비찜 레시피",
    },
    {
      id: 3,
      title: "계란찜",
      content: "계란찜 레시피",
    },
  ];

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <div className="header">
          <button className="login-button">로그인</button>
        </div>

        {/* Navigation Bar */}
        <div className="navbar">
          <div className="nav-item">레시피</div>
          <Link to="/recipes" className="nav-item">
            검색
          </Link>
          <div className="nav-item">게시물</div>
        </div>

        {/* Main Content */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="posts">
                {posts.map((post) => (
                  <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/recipes" element={<RecipeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
