import React from "react";
import "./assets/css/App.css";
import "./assets/css/Header.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import logo from "./assets/svg/logo.jpg"; // 로고 이미지 파일 경로
import LoginPage from "./components/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./layout/Header";
import PostList from "./pages/PostList";
import PostModal from "./components/PostModal";
import CreatePostModal from "./components/CreatePostModal";
import AddPostButton from "./components/AddPostButton";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <img src={logo} alt="Logo" className="header-logo" />
              <span className="header-title">맛남의 장</span>
            </div>
            <div className="header-right">
              {/* <button className="login-button">로그인</button> */}
              <Link to="/login" className="login-button">
                로그인
              </Link>
              <button className="material-symbols-outlined">menu</button>
            </div>
          </div>
          {/* Navigation Bar */}
          <div className="navbar">
            <Link to="/" className="nav-item">
              레시피
            </Link>
            <Link to="/search" className="nav-item">
              검색
            </Link>
            <Link to="/board" className="nav-item">
              게시물
            </Link>
          </div>
          {/* Main Content */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/board" element={<PostList />} />
          </Routes>
          <PostModal />
          <CreatePostModal />
          <AddPostButton />{" "}
          {/* 특정 탭에서만 우측 하단에 표시되는 게시물 작성 버튼 */}
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
