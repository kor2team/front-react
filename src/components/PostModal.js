import useStore from "../store/useStore";
import { useState } from "react";

function PostModal() {
  const { isModalOpen, closeModal, selectedPost } = useStore();
  const [comments, setComments] = useState([
    { id: 1, text: "첫 번째 댓글입니다." },
    { id: 2, text: "좋은 게시물입니다!" },
    { id: 3, text: "궁금한 점이 있습니다." },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false); // 댓글 섹션 표시 여부

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    // 임의로 댓글을 추가합니다.
    const newCommentObject = {
      id: comments.length + 1,
      text: newComment,
    };
    setComments([...comments, newCommentObject]);
    setNewComment("");
  };

  if (!isModalOpen || !selectedPost) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      {" "}
      {/* 배경을 완전한 흰색으로 설정 */}
      <div className="bg-white p-6 rounded shadow-lg relative max-w-4xl w-full flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black transition"
        >
          ✕
        </button>
        <div className="flex flex-row">
          {/* 왼쪽: 이미지 */}
          <div className="w-2/3">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full rounded"
            />
          </div>

          {/* 오른쪽: 제목, 설명, 좋아요 및 댓글 */}
          <div className="w-1/3 p-4">
            <h2 className="text-xl font-bold mb-4">{selectedPost.title}</h2>
            <p>{selectedPost.description}</p>
            <div className="mt-4 flex items-center space-x-2">
              <button className="mr-2 text-red-500">❤️</button>
              <button
                className="text-gray-500 flex items-center"
                onClick={() => setShowComments(!showComments)}
              >
                💬
                <span className="ml-1">{comments.length}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 - showComments가 true일 때만 표시 */}
        {showComments && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">댓글</h3>
            {comments.length === 0 ? (
              <p className="text-gray-500">아직 댓글이 없습니다.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((comment) => (
                  <li key={comment.id} className="text-gray-700">
                    {comment.text}
                  </li>
                ))}
              </ul>
            )}

            {/* 댓글 입력 폼 */}
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="무엇이 궁금하신가요? 댓글을 남겨주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-l"
              />
              <button
                onClick={handleAddComment}
                className="bg-green-500 text-white p-2 rounded-r"
              >
                전송
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostModal;
