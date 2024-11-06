import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./components/MainPage";
import SearchPage from "./components/SearchPage";
import logo from "./assets/svg/logo.jpg";
import LoginPage from "./components/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostList from "./pages/PostList";
import PostModal from "./components/PostModal";
import useStore from "./store/useStore";
import CreatePost from "./components/CreatePost";
import ProfilePage from "./components/ProfilePage"; // 개인정보 페이지 컴포넌트 import
import Footer from "./layout/Footer";

const queryClient = new QueryClient();

function App() {
  const [loggedInEmail, setLoggedInEmail] = useState(""); // 로그인한 이메일 상태

  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setLoggedInEmail(email);
    }
  }, []);

  const handleLogin = (email) => {
    setLoggedInEmail(email);
    localStorage.setItem("loggedInEmail", email);
    window.location.href = "/";
  };

  const handleLogout = () => {
    setLoggedInEmail("");
    localStorage.removeItem("loggedInEmail");
    window.location.href = "/";
  };

  const currentComponent = useStore((state) => state.currentComponent);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="max-w-3xl mx-auto p-5">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b-2 border-orange-500">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="max-w-12 h-auto mr-2" />
                <span className="text-xl font-semibold text-orange-500">
                  맛남의 장
                </span>
              </Link>
            </div>
            <div className="flex justify-end">
              {loggedInEmail ? (
                <>
                  <Link
                    to="/profile"
                    className="mr-4 text-orange-500 hover:text-blue-500"
                  >
                    {loggedInEmail}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-blue-500"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-4 sm:space-y-0 border-b border-gray-300 py-4">
            <Link
              to="/"
              className="px-4 py-2 text-orange-500 border border-orange-500 rounded hover:text-blue-500 hover:border-blue-500"
            >
              레시피
            </Link>
            <Link
              to="/search"
              className="px-4 py-2 text-orange-500 border border-orange-500 rounded hover:text-blue-500 hover:border-blue-500"
            >
              검색
            </Link>
            <Link
              to="/board"
              className="px-4 py-2 text-orange-500 border border-orange-500 rounded hover:text-blue-500 hover:border-blue-500"
            >
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
            <Route
              path="/board"
              element={
                <div>
                  {currentComponent === "postList" && <PostList />}
                  {currentComponent === "createPost" && <CreatePost />}
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <ProfilePage email={loggedInEmail} onLogout={handleLogout} />
              }
            />
          </Routes>

          <PostModal />
          <hr />
          <Footer />
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
