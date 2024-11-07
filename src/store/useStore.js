import { create } from "zustand";

const useStore = create((set) => ({
  posts: [], // 초기 게시물 상태

  // 현재 활성화된 탭 상태
  activeTab: "all",

  // 현재 표시할 컴포넌트 상태 ("postList", "createPost" 등)
  currentComponent: "postList",

  // 상세보기 모달 상태 및 선택된 게시물 데이터
  isModalOpen: false,
  selectedPost: null,

  // 사용자 게시물 필터링 여부
  filterUserPosts: false,

  // 게시물 추가 함수
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts], // 새 게시물을 배열 앞에 추가
    })),

  // 표시할 컴포넌트를 변경하는 함수
  setComponent: (component) => set({ currentComponent: component }),

  // 활성화된 탭을 변경하는 함수
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 모달을 열고 선택된 게시물을 설정하는 함수
  openModal: (post) => set({ isModalOpen: true, selectedPost: post }),

  // 모달을 닫고 선택된 게시물을 초기화하는 함수
  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  // 사용자 게시물 필터링 설정 함수
  setFilterUserPosts: (isUserPosts) => set({ filterUserPosts: isUserPosts }),
}));

export default useStore;
