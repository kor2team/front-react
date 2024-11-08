import React, { useState } from "react";
import useStore from "../store/useStore";

function LoginPage() {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
  const [nickname, setNickname] = useState(""); // 닉네임 상태 (회원가입 전용)
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 토글 상태

  // Zustand에서 필요한 상태와 함수 불러오기
  const { login, signup, errorMessage } = useStore();

  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    login(email, password); // Zustand의 login 함수 호출
  };

  // 회원가입 처리 함수
  const handleSignup = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    signup(email, password, confirmPassword); // Zustand의 signup 함수 호출
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100 px-4 py-6 max-h-[90vh]">
      {/* 로그인 또는 회원가입 제목 */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "로그인" : "회원가입"}
      </h2>

      {/* 로그인 또는 회원가입 폼 */}
      <form
        onSubmit={isLogin ? handleLogin : handleSignup} // 로그인 또는 회원가입 처리
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        {/* 이메일 입력 필드 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* 닉네임 입력 필드 (회원가입 전용) */}
        {!isLogin && (
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        )}

        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* 비밀번호 확인 필드 (회원가입 전용) */}
        {!isLogin && (
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        )}

        {/* 오류 메시지 표시 */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        {/* 로그인 / 회원가입 버튼 */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {isLogin ? "로그인" : "회원가입"}
        </button>
      </form>

      {/* 로그인 / 회원가입 토글 버튼 */}
      <button
        onClick={() => setIsLogin(!isLogin)} // 로그인 / 회원가입 상태 토글
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        {isLogin ? "회원가입 하시겠어요?" : "이미 계정이 있으신가요?"}
      </button>
    </div>
  );
}

export default LoginPage;
