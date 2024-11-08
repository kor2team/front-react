import { useInfiniteQuery } from "@tanstack/react-query";
import useStore from "../store/useStore";

function PostList({ userId }) {
  // Zustand에서 모달 열기, 탭 상태, 필터링 관련 상태와 함수를 가져옴
  const {
    openModal, // 모달을 열어 특정 게시물의 상세 정보를 표시하는 함수
    activeTab, // 현재 활성화된 탭 상태 (전체글, 내가 쓴 글, 좋아요한 글)
    setActiveTab, // 활성화된 탭을 설정하는 함수
    filterUserPosts, // 내가 쓴 글만 보기 필터링 여부
    setFilterUserPosts, // 내가 쓴 글만 보기 필터링 설정 함수
    filterLikedPosts, // 좋아요한 글 필터링 여부
    setFilterLikedPosts, // 좋아요한 글 필터링 설정 함수
  } = useStore();

  const setComponent = useStore((state) => state.setComponent);

  // 게시물 작성 버튼 클릭 시 호출되어 'createPost' 컴포넌트를 활성화하는 함수
  const handleCreatePost = () => {
    setComponent("createPost");
  };

  // 게시물 데이터를 가져오는 비동기 함수
  const fetchPosts = async ({ pageParam = 0 }) => {
    // 샘플 데이터 생성 (pageParam에 따라 게시물 ID가 다름)
    const sampleData = {
      posts: [
        {
          id: pageParam * 3 + 1,
          userId: 1,
          recipeName: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          ingredients: "고기, 감자",
          instructions: "이것은 임의의 설명입니다.",
          likedByUser: pageParam % 2 === 0, // 짝수 페이지의 게시물은 좋아요한 것으로 표시
        },
        {
          id: pageParam * 3 + 1,
          userId: 2,
          recipeName: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          ingredients: "고기, 감자",
          instructions: "이것은 임의의 설명입니다.",
          likedByUser: pageParam % 2 === 0, // 짝수 페이지의 게시물은 좋아요한 것으로 표시
        },
        {
          id: pageParam * 3 + 1,
          userId: 3,
          recipeName: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          ingredients: "고기, 감자",
          instructions: "이것은 임의의 설명입니다.",
          likedByUser: pageParam % 2 === 0, // 짝수 페이지의 게시물은 좋아요한 것으로 표시
        },
        {
          id: pageParam * 3 + 1,
          userId: 1,
          recipeName: `게시물2 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          ingredients: "고기, 감자2",
          instructions: "이것은 임의의 설명입니다2.",
          likedByUser: pageParam % 2 === 0, // 짝수 페이지의 게시물은 좋아요한 것으로 표시
        },
      ],
      nextPage: pageParam < 10 ? pageParam + 1 : undefined, // 페이지가 4 미만일 때 다음 페이지를 제공
    };
    return sampleData;
  };

  // useInfiniteQuery 훅을 사용하여 게시물을 무한 스크롤로 가져옴
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", activeTab], // 쿼리 키로 게시물 데이터 캐싱 및 관리
      queryFn: fetchPosts, // 게시물 데이터를 가져오는 함수
      getNextPageParam: (lastPage) => lastPage.nextPage, // 다음 페이지의 파라미터를 가져오는 함수
    });

  // 게시물을 필터링하는 함수
  const filteredPosts = (posts) => {
    if (filterUserPosts) {
      return posts.filter((post) => post.userId === 1); // 내가 쓴 글 필터링 임의의 아이디 1로 설정
    }
    if (filterLikedPosts) {
      return posts.filter((post) => post.likedByUser); // 좋아요한 글 필터링
    }
    return posts; // 필터링 조건이 없을 경우 전체 게시물 반환
  };

  return (
    <>
      {/* 게시물 필터링 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center mb-5 ">
        <button
          onClick={() => {
            setFilterUserPosts(false);
            setFilterLikedPosts(false);
            setActiveTab("all"); // 전체글 보기 탭 활성화
          }}
          className={`px-4 py-2 ${
            activeTab === "all" ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-l sm:rounded-none sm:rounded-l border border-card w-full sm:w-auto`}
        >
          전체글 보기
        </button>
        <button
          onClick={() => {
            setFilterUserPosts(true); // 내가 쓴 글 필터링 활성화
            setFilterLikedPosts(false);
            setActiveTab("user"); // 내가 쓴 글 보기 탭 활성화
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
            setFilterLikedPosts(true); // 좋아요한 글 필터링 활성화
            setActiveTab("liked"); // 좋아요한 글 보기 탭 활성화
          }}
          className={`px-4 py-2 ${
            activeTab === "liked" ? "bg-orange-500 text-white" : "bg-gray-200"
          } rounded-r sm:rounded-none sm:rounded-r border border-card w-full sm:w-auto`}
        >
          좋아요한 글 보기
        </button>
      </div>

      {/* 게시물 리스트 표시 */}
      <div className="p-4 grid grid-cols-2 gap-4 w-full  h-4/5 overflow-y-auto">
        {data?.pages.map((page) =>
          filteredPosts(page.posts).map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 border border-card rounded-md shadow-card cursor-pointer"
              onClick={() => openModal(post)} // 클릭 시 모달 열림
            >
              <img
                src={post.image}
                alt={post.recipeName}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-gray-800">
                {post.recipeName}
              </h3>
              <p className="text-gray-600 mt-1">{post.description}</p>
            </div>
          ))
        )}
      </div>

      {/* 더보기 버튼 (다음 페이지 로드) */}
      {hasNextPage && (
        <div className="flex justify-center mt-5">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="text-white bg-orange-500 w-full max-w-md px-4 py-2 rounded shadow-card"
          >
            {isFetchingNextPage ? (
              "로딩중" // 로딩 중일 때 표시
            ) : (
              <span className="material-symbols-outlined">add</span>
            )}
          </button>
        </div>
      )}

      {/* 게시물 작성 버튼 (우하단 고정) */}
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
