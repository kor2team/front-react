import React from "react";
import logo from "../assets/svg/logo.jpg"; // 로고 경로 수정
import "../assets/css/Header.css"; // Header 스타일 파일

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="로고" className="header-logo" />
      <h1 className="header-title">맛남의 장</h1>
    </header>
  );
}

export default Header;
