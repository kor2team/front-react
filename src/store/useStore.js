import { create } from "zustand";

// Zustand store 생성 함수 정의
const useStore = create((set) => ({
  // 현재 활성화된 탭 상태, 기본값은 "all"
  activeTab: "all",

  // 상세보기 모달의 열림 상태를 나타내는 변수
  isModalOpen: false,

  // 게시물 생성 모달의 열림 상태를 나타내는 변수
  isCreateModalOpen: false,

  // 선택된 게시물의 정보를 저장하는 변수
  selectedPost: null,

  // activeTab을 변경하는 함수, 전달된 탭 이름으로 상태 업데이트
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 상세보기 모달을 열고, 선택된 게시물 데이터를 설정하는 함수
  openModal: (post) => set({ isModalOpen: true, selectedPost: post }),

  // 상세보기 모달을 닫고, 선택된 게시물 데이터를 초기화하는 함수
  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  // 게시물 생성 모달을 여는 함수
  openCreateModal: () => set({ isCreateModalOpen: true }),

  // 게시물 생성 모달을 닫는 함수
  closeCreateModal: () => set({ isCreateModalOpen: false }),
}));

export default useStore;
