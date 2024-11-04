import { useInfiniteQuery } from "@tanstack/react-query";
import useStore from "../store/useStore";

function PostList() {
  const { openModal, activeTab } = useStore();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const sampleData = {
      posts: [
        {
          id: pageParam * 3 + 1,
          title: `게시물 ${pageParam * 3 + 1}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
        {
          id: pageParam * 3 + 2,
          title: `게시물 ${pageParam * 3 + 2}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
        {
          id: pageParam * 3 + 3,
          title: `게시물 ${pageParam * 3 + 3}`,
          image: "https://via.placeholder.com/150",
          description: "이것은 임의의 설명입니다.",
        },
      ],
      nextPage: pageParam < 3 ? pageParam + 1 : undefined,
    };

    return sampleData;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", activeTab],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
      {data?.pages.map((page) =>
        page.posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 border border-gray-200 rounded shadow-lg cursor-pointer"
            onClick={() => openModal(post)}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
          </div>
        ))
      )}
      {hasNextPage && (
        <button
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
          className="text-white"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default PostList;
