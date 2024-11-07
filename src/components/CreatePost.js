import React, { useState } from "react";
import useStore from "../store/useStore";

function CreatePost() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addPost = useStore((state) => state.addPost);
  const setComponent = useStore((state) => state.setComponent);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const newPost = {
      id: Date.now(),
      title,
      description,
      image,
      userId: 1, // 임시 사용자 ID
    };
    addPost(newPost); // 게시물 추가
    setComponent("postList"); // PostList로 이동
  };

  return (
    <div className="w-full max-w-container mx-auto p-5 border border-container rounded-md shadow-modal bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">게시글 작성</h2>
        <button
          className="text-white text-lg"
          onClick={() => setComponent("postList")}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="flex gap-5">
        <div
          className="w-1/2 h-64 border border-card rounded-md overflow-hidden bg-gray-100 flex justify-center items-center cursor-pointer"
          onClick={() => document.getElementById("imageUpload").click()} // div 전체 클릭을 트리거
        >
          {image ? (
            <img
              src={image}
              alt="uploaded"
              className="w-full h-full object-cover"
            />
          ) : (
            <label className="text-gray-400 cursor-pointer">
              <input
                type="file"
                id="imageUpload" // ID를 부여
                className="hidden"
                onChange={handleImageUpload}
              />
              이미지를 업로드하세요
            </label>
          )}
        </div>
        <div className="w-1/2 space-y-4">
          <input
            type="text"
            placeholder="글 제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border border-card rounded-sm focus:outline-none"
          />
          <textarea
            placeholder="내용을 적어주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 p-2.5 border border-card rounded-sm focus:outline-none"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-orange-500 text-white rounded-md"
        >
          저장하기
        </button>
        <button
          onClick={() => setComponent("postList")}
          className="px-4 py-2 bg-orange-500 text-white rounded-md"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
