import React, { useState } from "react";
import PostModal from "./PostModal";

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const recipes = [
    {
      id: 1,
      title: "피자",
      description: "간편한 조리 방식으로 만드는 피자",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjRfMjAy%2FMDAxNzI0NDc5NzkxNjMx.iy-u9uHvW4ZSR0WfBNkpyTmxWWanwmAnMnH0a2HVxd0g.jLf4V0MCNBewJRyWXpXgTfM7lPM9veg2Kwdan4q0C0Eg.PNG%2F1000051021.png&type=a340",
    },
    {
      id: 2,
      title: "빵 피자",
      description: "집에 있는 재료로 간단하게 만들어 먹을 수 있는 피자",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjBfOSAg%2FMDAxNTA1ODYwNTA4MDQy.r1BzNsS1wPynSNIB0lSp6liz8SjaFKUjzVWI8wr4Qmwg.fj0JEmqRerrSNIQVbwuFA2qqSd5FSWMkPrk-qwGZLhgg.JPEG.leerea1004%2FP20170919_191010199_49CF8523-F55B-4B78-A6A5-30A16CEF2AAC.jpg&type=a340",
    },
    {
      id: 3,
      title: "치킨",
      description: "바삭하게 구운 맛있는 치킨",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAzMjVfMjEg%2FMDAxNjE5MTE3MTMwNzI0.R0zqDWLRv10yZ-xG6Ok2rp7cLaElbxvlk4TkNw6DiRIg.MdqXkqajD-BYkYaJx8lQJOth7bB9PQ6F71t0Poclnr8g.PNG.%EC%B9%98%ED%82%A8.png&type=a340",
    },
    {
      id: 4,
      title: "스파게티",
      description: "맛있는 토마토 소스 스파게티",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MThfMjEg%2FMDAxNzI0NjY5MzE2MzMx.ZeMspmZX9YNBdYtnFj7kxuYwcnpo6YKn4u6h-TmWcmAg.e7lW2VJ-b-WhIehyGf4qGrY74oSgmI6T74V7sYgEqLMg.PNG.%EC%8A%A4%ED%8C%8C%EA%B2%8C%ED%8B%B0.png&type=a340",
    },
    {
      id: 5,
      title: "햄버거",
      description: "달콤하고 짭짤한 햄버거",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjBfMTAg%2FMDAxNTA2NjU5NjAwMTgx.9fhZ1yFZKxlp2Pyzm0gVsseBOlh-QIylqtcMPgZo9Uw0.Ljrg0NCMdEX9DFHsT5tb2jv9uh6lhqv5v2-Ep36jiJ4g.PNG.%ED%95%98%EB%A6%84%EB%B3%B4%EA%B1%B0.png&type=a340",
    },
    {
      id: 6,
      title: "샐러드",
      description: "신선한 채소로 만든 샐러드",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjFfMjkg%2FMDAxNTA2Mzk0NzEwMzEw.DHbm_HlHcymwxX0itZ2yhsDWZMe19wPT4KNk7wC7vnkg.H2iiYm7y1D79o3wE-txl1a7y94KRIuh-xr8LlZn-T1Mg.PNG.%EC%83%98%EB%9F%AC%EB%93%9C.png&type=a340",
    },
    {
      id: 7,
      title: "김밥",
      description: "맛있고 간편한 김밥",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDAzMjZfMyAg%2FMDAxNjE5ODg1OTM5Mjk5.DzUBCgE-kKltTTaq7kc_tz4Fv4FjjQLC2N0uGOdwvnkg.Niyw63k6_hftwwQ5dYhmHML0nqXg1jj5lJlntZdkjZ8g.PNG.%EA%B9%80%EB%B0%98%EA%B1%B0.png&type=a340",
    },
    {
      id: 8,
      title: "떡볶이",
      description: "매콤달콤한 떡볶이",
      imageUrl:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MjFfMTAg%2FMDAxNTA2Mzk0NzEwMzEw.DHbm_HlHcymwxX0itZ2yhsDWZMe19wPT4KNk7wC7vnkg.H2iiYm7y1D79o3wE-txl1a7y94KRIuh-xr8LlZn-T1Mg.PNG.%EC%83%98%EB%9F%AC%EB%93%9C.png&type=a340",
    },
  ];

  // 모달 열기
  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* 레시피 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-[200px] object-cover rounded-t-lg mb-4"
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-orange-500">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden">{recipe.description}</p>

              <button
                onClick={() => openModal(recipe)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                더 보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {isModalOpen && selectedRecipe && (
        <PostModal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}

export default MainPage;
