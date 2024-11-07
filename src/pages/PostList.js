import { useInfiniteQuery } from "@tanstack/react-query";
import useStore from "../store/useStore";

function PostList({ userId }) {
  const {
    openModal,
    activeTab,
    setActiveTab,
    filterUserPosts,
    setFilterUserPosts,
    filterLikedPosts, // 좋아요한 글 필터링 여부
    setFilterLikedPosts, // 좋아요한 글 필터링 설정 함수
  } = useStore();

  const setComponent = useStore((state) => state.setComponent);
  const handleCreatePost = () => {
    setComponent("createPost");
  };

  const fetchPosts = async ({ pageParam = 0 }) => {
    const sampleData = {
      posts: [
        {
          id: pageParam * 3 + 1,
          userId: 1,
          title: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
          likedByUser: pageParam % 2 === 0, // 예시로 짝수 페이지의 게시물은 좋아요한 것으로 표시
        },
        {
          id: pageParam * 3 + 2,
          userId: 2,
          title: `게시물 ${pageParam * 3 + 2}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
          likedByUser: pageParam % 2 !== 0, // 예시
        },
        {
          id: pageParam * 3 + 3,
          userId: userId,
          title: `게시물 ${pageParam * 3 + 3}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
          likedByUser: true, // 예시로 항상 좋아요 표시
        },
      ],
      nextPage: pageParam < 4 ? pageParam + 1 : undefined,
    };
    return sampleData;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", activeTab],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const filteredPosts = (posts) => {
    if (filterUserPosts) {
      return posts.filter((post) => post.userId === userId);
    }
    if (filterLikedPosts) {
      return posts.filter((post) => post.likedByUser);
    }
    return posts;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center mb-5">
        <button
          onClick={() => {
            setFilterUserPosts(false);
            setFilterLikedPosts(false);
            setActiveTab("all");
          }}
          className={`px-4 py-2 ${
            activeTab === "all" ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-l sm:rounded-none sm:rounded-l border border-card w-full sm:w-auto`}
        >
          전체글 보기
        </button>
        <button
          onClick={() => {
            setFilterUserPosts(true);
            setFilterLikedPosts(false);
            setActiveTab("user");
          }}
          className={`px-4 py-2 ${
            activeTab === "user" ? "bg-orange-500 text-white" : "bg-gray-200"
          } border border-card w-full sm:w-auto`}
        >
          내가 쓴 글 보기
        </button>
        <button
          onClick={() => {
            setFilterUserPosts(false);
            setFilterLikedPosts(true);
            setActiveTab("liked");
          }}
          className={`px-4 py-2 ${
            activeTab === "liked" ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-r sm:rounded-none sm:rounded-r border border-card w-full sm:w-auto`}
        >
          좋아요한 글 보기
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 w-full overflow-y-auto">
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
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-5">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="text-white bg-orange-500 w-full max-w-md px-4 py-2 rounded shadow-card"
          >
            {isFetchingNextPage ? (
              "로딩중"
            ) : (
              <span className="material-symbols-outlined">add</span>
            )}
          </button>
        </div>
      )}

      <button
        onClick={handleCreatePost}
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600"
      >
        게시물 작성
      </button>
    </>
  );
}

export default PostList;
