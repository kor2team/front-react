import { useInfiniteQuery } from "@tanstack/react-query";
import useStore from "../store/useStore";

function PostList({ userId }) {
  // Zustand 스토어에서 필요한 상태와 메서드를 가져옴
  const {
    openModal, // 게시물 클릭 시 모달을 여는 함수
    activeTab, // 현재 활성화된 탭
    setActiveTab, // 활성화할 탭 설정 함수
    filterUserPosts, // 사용자 게시물 필터링 여부
    setFilterUserPosts, // 사용자 게시물 필터링 설정 함수
    openCreatePost, // 게시물 작성 컴포넌트 열기 함수
  } = useStore();

  // 무한 스크롤에서 다음 페이지 데이터를 가져오는 함수 (예시 데이터)
  const fetchPosts = async ({ pageParam = 0 }) => {
    const sampleData = {
      posts: [
        {
          id: pageParam * 3 + 1,
          userId: 1,
          title: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
        {
          id: pageParam * 3 + 2,
          userId: 2,
          title: `게시물 ${pageParam * 3 + 2}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
        {
          id: pageParam * 3 + 3,
          userId: userId,
          title: `게시물 ${pageParam * 3 + 3}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
        {
          id: pageParam * 3 + 4,
          userId: userId,
          title: `게시물 ${pageParam * 3 + 4}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
      ],
      nextPage: pageParam < 4 ? pageParam + 1 : undefined,
    };
    return sampleData;
  };

  // useInfiniteQuery 훅을 사용하여 무한 스크롤로 게시물을 가져옴
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", activeTab],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  // 사용자 게시물 필터링을 수행하는 함수
  const filteredPosts = (posts) =>
    filterUserPosts ? posts.filter((post) => post.userId === userId) : posts;

  return (
    <>
      {/* 탭 선택 버튼 */}
      <div className="flex justify-center mb-5">
        <button
          onClick={() => {
            setFilterUserPosts(false);
            setActiveTab("all");
          }}
          className={`px-4 py-2 ${
            !filterUserPosts ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-l border border-card`}
        >
          전체글 보기
        </button>
        <button
          onClick={() => {
            setFilterUserPosts(true);
            setActiveTab("user");
          }}
          className={`px-4 py-2 ${
            filterUserPosts ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-r border border-card`}
        >
          내가 쓴글 보기
        </button>
      </div>

      {/* 게시물 목록 */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 overflow-y-auto">
        {data?.pages.map((page) =>
          filteredPosts(page.posts).map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 border border-card rounded-md shadow-card cursor-pointer"
              onClick={() => openModal(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-1">{post.description}</p>
            </div>
          ))
        )}
        {hasNextPage && (
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="text-white bg-orange-500 px-4 py-2 mt-5 rounded shadow-card"
          >
            {isFetchingNextPage ? (
              "로딩중"
            ) : (
              <span class="material-symbols-outlined">add</span>
            )}
          </button>
        )}
      </div>

      {/* 게시물 작성 버튼 */}
      <button
        onClick={() => openCreatePost(true)}
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600"
      >
        게시물 작성
      </button>

      {/* 게시물 작성 페이지 오픈 */}
      {/* {isCreatePostOpen && } */}
    </>
  );
}

export default PostList;
