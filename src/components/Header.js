import useStore from "../store/useStore";

function Header() {
  return (
    <div className="flex justify-between items-center bg-black text-white p-4">
      {/* 가운데 정렬된 Main */}
      <h1 className="text-2xl text-center flex-1">Main</h1>

      {/* 우측 정렬된 로그인 버튼 */}
      <div className="flex-1 flex justify-end">
        <div className="rounded-full bg-gray-500 w-8 h-8"></div>
        <div className="bg-gray-500 w-8 h-4 ml-2"></div>
      </div>

      {/* 레시피, 검색, 게시물 버튼 라인 */}
      <div className="w-full flex justify-center mt-4 space-x-4">
        <button className="hover:text-yellow-500">레시피</button>
        <button className="hover:text-yellow-500">검색</button>
        <button className="hover:text-yellow-500">게시물</button>
      </div>
    </div>
  );
}

export default Header;
