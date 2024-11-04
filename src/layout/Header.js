import useStore from "../store/useStore";

function Header() {
  const { setActiveTab, activeTab } = useStore();

  return (
    <div className="flex flex-col items-center bg-gray-200 text-white p-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl text-center flex-1">Main</h1>
        <button className="text-white">로그인</button>
      </div>

      <div className="w-full flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setActiveTab("recipe")}
          className="hover:text-yellow-500"
        >
          레시피
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className="hover:text-yellow-500"
        >
          검색
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`${
            activeTab === "posts" ? "text-yellow-400" : ""
          } hover:text-yellow-500`}
        >
          게시물
        </button>
      </div>
    </div>
  );
}

export default Header;
