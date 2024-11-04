import useStore from "../store/useStore";
import { useEffect } from "react";

function AddPostButton() {
  const { activeTab, openCreateModal } = useStore();

  useEffect(() => {
    console.log("Current activeTab:", activeTab); // 현재 activeTab 값을 확인
  }, [activeTab]);

  // `posts`나 `myContent` 탭이 활성화되지 않은 경우 버튼 숨기기
  if (activeTab !== "posts" && activeTab !== "myContent") return null;

  return (
    <button
      onClick={openCreateModal}
      className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition duration-200"
    >
      게시물 작성
    </button>
  );
}

export default AddPostButton;
