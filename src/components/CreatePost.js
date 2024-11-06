import React from "react";
import useStore from "../store/useStore";

function CreatePost() {
  const setComponent = useStore((state) => state.setComponent);
  const handlePostList = () => {
    setComponent("postList");
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handlePostList}
        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-r-sm"
      >
        저장하기
      </button>
      <button
        onClick={handlePostList}
        className="fixed bottom-4 right-4 bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600"
      >
        돌아가기
      </button>
    </div>
  );
}

export default CreatePost;
