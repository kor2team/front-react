import { create } from "zustand";

// Zustand store 생성 함수 정의
const useStore = create((set) => ({
  activeTab: "all", // 현재 활성화된 탭의 상태를 저장하는 변수, 기본값은 'all'
  isModalOpen: false, // 상세보기 모달의 열림 상태를 나타내는 변수
  currentComponent: "postList", // 현재 활성화된 컴포넌트 상태, 기본값은 'postList'
  selectedPost: null, // 선택된 게시물의 정보를 저장하는 변수
  filterUserPosts: false, // 사용자가 작성한 게시물만 필터링하는 상태
  filterLikedPosts: false, // 사용자가 좋아요한 게시물만 필터링하는 상태
  isLoggedIn: false, // 로그인 여부를 나타내는 상태, 기본값은 로그아웃 상태인 false
  errorMessage: "", // 오류 메시지를 저장하는 상태, 기본값은 빈 문자열

  // activeTab을 변경하는 함수
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 게시물 작성창 상태를 변경하는 함수
  setComponent: (component) => set({ currentComponent: component }),

  // 상세보기 모달을 열고, 선택된 게시물 데이터를 설정하는 함수
  openModal: (post) => set({ isModalOpen: true, selectedPost: post }),

  // 상세보기 모달을 닫고, 선택된 게시물 데이터를 초기화하는 함수
  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  // 내가 쓴 글 보기 필터링 설정 함수
  setFilterUserPosts: (isUserPosts) => set({ filterUserPosts: isUserPosts }),

  // 좋아요한 글 필터링 설정 함수
  setFilterLikedPosts: (isLikedPosts) =>
    set({ filterLikedPosts: isLikedPosts }),

  // 로그인 상태를 설정하는 함수
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),

  // // 오류 메시지 상태를 설정하는 함수
  // setErrorMessage: (message) => set({ errorMessage: message }),

  // // 로그인 처리 함수 - 이메일과 비밀번호를 확인하여 로그인 상태와 오류 메시지를 업데이트
  // login: (email, password) => {
  //   if (email === "test@example.com" && password === "password") {
  //     // 로그인 성공 시 로그인 상태 true 및 오류 메시지 초기화
  //     set({ isLoggedIn: true, errorMessage: "" });
  //     alert("로그인 성공!");
  //   } else {
  //     // 로그인 실패 시 오류 메시지 설정
  //     set({ errorMessage: "이메일 또는 비밀번호가 올바르지 않습니다." });
  //   }
  // },

  // // 회원가입 처리 함수 - 비밀번호 확인 및 회원가입 상태 업데이트
  // signup: (email, password, confirmPassword) => {
  //   if (password !== confirmPassword) {
  //     // 비밀번호 불일치 시 오류 메시지 설정
  //     set({ errorMessage: "비밀번호가 일치하지 않습니다." });
  //     return;
  //   }
  //   // 회원가입 성공 시 로그인 상태 true 및 오류 메시지 초기화
  //   set({ isLoggedIn: true, errorMessage: "" });
  //   alert("회원가입 성공!");
  // },
}));

export default useStore;
