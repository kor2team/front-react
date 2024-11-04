import useStore from "../store/useStore";

function UserContent() {
  const { activePage, openModal } = useStore();

  if (activePage === "posts") {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((post) => (
          <div
            key={post}
            className="bg-white p-4 border border-gray-200 rounded shadow-lg cursor-pointer"
            onClick={() =>
              openModal({
                id: post,
                title: `게시물 ${post}`,
                description: `게시물 ${post}의 설명`,
              })
            }
          >
            <img
              src="example.jpg"
              alt="게시물 이미지"
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">게시물 {post}</h3>
          </div>
        ))}
      </div>
    );
  }

  return <div className="p-4 text-white">다른 페이지: {activePage}</div>;
}

export default UserContent;
