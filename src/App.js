import React, { useEffect, useState } from "react";
import "./assets/css/App.css";
import "./assets/css/Header.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import logo from "./assets/svg/logo.jpg"; // 로고 이미지 파일 경로
import LoginPage from "./components/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostList from "./pages/PostList";
import PostModal from "./components/PostModal";
import CreatePostModal from "./components/CreatePostModal";
import AddPostButton from "./components/AddPostButton";

const queryClient = new QueryClient();

function App() {
  const [loggedInEmail, setLoggedInEmail] = useState(""); // 로그인한 이메일 상태

  useEffect(() => {
    // 로컬 스토리지에서 이메일을 읽어옴
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setLoggedInEmail(email);
    }
  }, []);

  const handleLogin = (email) => {
    setLoggedInEmail(email); // 로그인한 이메일 설정
    localStorage.setItem("loggedInEmail", email); // 로컬 스토리지에 저장
    window.location.href = "/"; // 로그인 후 홈으로 리디렉션
  };

  const handleLogout = () => {
    setLoggedInEmail(""); // 로그인 상태 초기화
    localStorage.removeItem("loggedInEmail"); // 로컬 스토리지에서 제거
  };

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
            {/* <div className="header-right">
              <button className="login-button">로그인</button>
              <Link to="/login" className="login-button">
                로그인
              </Link>
              <button className="material-symbols-outlined">menu</button>
            </div> */}
            <div className="header-right">
              {loggedInEmail ? (
                <>
                  <span className="nav-item">{loggedInEmail}</span>{" "}
                  {/* 로그인한 이메일 표시 */}
                  <button onClick={handleLogout} className="nav-item2">
                    로그아웃
                  </button>{" "}
                  {/* 로그아웃 버튼 */}
                </>
              ) : (
                <Link to="/login" className="nav-item">
                  로그인
                </Link>
              )}
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
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
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
