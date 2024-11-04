import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./layout/Header";
import PostList from "./pages/PostList";
import PostModal from "./components/PostModal";
import CreatePostModal from "./components/CreatePostModal";
import AddPostButton from "./components/AddPostButton";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-white">
        <Header />
        <PostList />
        <PostModal />
        <CreatePostModal />
        <AddPostButton />{" "}
        {/* 특정 탭에서만 우측 하단에 표시되는 게시물 작성 버튼 */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
