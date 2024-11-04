import useStore from "../store/useStore";
import { useState } from "react";

function CreatePostModal() {
  const { isCreateModalOpen, closeCreateModal } = useStore();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0])); // 이미지 미리보기 URL 생성
    }
  };

  const handleSave = () => {
    // 저장 로직을 여기에 추가합니다.
    console.log({
      title,
      image, // 실제 업로드 시엔 파일을 서버로 보내야 합니다.
      content,
    });
    closeCreateModal();
    // 필드 초기화
    setTitle("");
    setImage(null);
    setContent("");
  };

  if (!isCreateModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button
          onClick={closeCreateModal}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black transition"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">게시물 작성</h2>

        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />

        {/* 이미지 업로드 */}
        <div className="mb-4">
          <label className="block mb-2">이미지 삽입</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-4 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        {/* 내용 입력 */}
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
          rows="4"
        />

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600 transition duration-200"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default CreatePostModal;
