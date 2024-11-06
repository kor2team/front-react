import { create } from "zustand";

// Zustand store 생성 함수 정의
const useStore = create((set) => ({
  // 현재 활성화된 탭 상태, 기본값은 "all"
  activeTab: "all",

  // 상세보기 모달의 열림 상태를 나타내는 변수
  isModalOpen: false,

  // 게시물 작성 상태창 열림 상태 나타내는 변수
  currentComponent: "postList", // 상태의 기본값은 postList

  // 선택된 게시물의 정보를 저장하는 변수
  selectedPost: null,
  filterUserPosts: false, // 필터 상태 기본값

  // activeTab을 변경하는 함수, 전달된 탭 이름으로 상태 업데이트
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 게시물 작성창 상태를 변경기능
  setComponent: (component) => set({ currentComponent: component }),

  // 상세보기 모달을 열고, 선택된 게시물 데이터를 설정하는 함수
  openModal: (post) => set({ isModalOpen: true, selectedPost: post }),

  // 상세보기 모달을 닫고, 선택된 게시물 데이터를 초기화하는 함수
  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  // 게시물 생성 컴포넌트를 여는 함수
  openCreatePost: () => set({ isCreatePostOpen: true }),

  // 필터 상태 변경 함수
  setFilterUserPosts: (isUserPosts) => set({ filterUserPosts: isUserPosts }),

  // 활성화된 탭 변경 함수
  // setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useStore;
