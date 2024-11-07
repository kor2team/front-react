import { create } from "zustand";

// Zustand store 생성 함수 정의
const useStore = create((set) => ({
  activeTab: "all", // 현재 활성화된 탭 상태, 기본값은 "all"
  isModalOpen: false, // 상세보기 모달의 열림 상태를 나타내는 변수
  currentComponent: "postList", // 게시물 작성 상태창 열림 상태 나타내는 변수
  selectedPost: null, // 선택된 게시물의 정보를 저장하는 변수
  filterUserPosts: false, // 사용자 게시물 필터링 상태
  filterLikedPosts: false, // 좋아요한 게시물 필터링 상태
  likedPosts: [], // 좋아요한 게시물들을 저장할 배열

  // activeTab을 변경하는 함수
  setActiveTab: (tab) => set({ activeTab: tab }),

  // 게시물 작성창 상태를 변경하는 함수
  setComponent: (component) => set({ currentComponent: component }),

  // 상세보기 모달을 열고, 선택된 게시물 데이터를 설정하는 함수
  openModal: (post) => set({ isModalOpen: true, selectedPost: post }),

  // 상세보기 모달을 닫고, 선택된 게시물 데이터를 초기화하는 함수
  closeModal: () => set({ isModalOpen: false, selectedPost: null }),

  setFilterUserPosts: (isUserPosts) => set({ filterUserPosts: isUserPosts }),
  setFilterLikedPosts: (isLikedPosts) =>
    set({ filterLikedPosts: isLikedPosts }),

  // 좋아요 버튼 클릭 시 해당 게시물을 좋아요 목록에 추가하거나 제거하는 함수
  toggleLikePost: (postId) =>
    set((state) => {
      const likedPosts = [...state.likedPosts];
      const index = likedPosts.indexOf(postId);

      if (index !== -1) {
        likedPosts.splice(index, 1); // 이미 좋아요가 되어 있다면 제거
      } else {
        likedPosts.push(postId); // 좋아요하지 않았다면 추가
      }
      return { likedPosts };
    }),

  // 필터링된 게시물들을 반환하는 함수
  filteredPosts: (
    posts,
    filterUserPosts,
    filterLikedPosts,
    likedPosts,
    userId
  ) => {
    let filtered = posts;

    // 내가 쓴 게시물만 필터링
    if (filterUserPosts) {
      filtered = filtered.filter((post) => post.userId === userId);
    }

    // 좋아요한 게시물만 필터링
    if (filterLikedPosts) {
      filtered = filtered.filter((post) => likedPosts.includes(post.id));
    }

    return filtered;
  },
}));

export default useStore;
