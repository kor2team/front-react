import React, { useState } from "react";

function SearchPage() {
  const [isIngredientModalOpen, setIngredientModalOpen] = useState(false);
  const [isMethodModalOpen, setMethodModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("정확순");
  const [isDescending, setIsDescending] = useState(true); // 화살표 방향 제어

  const handleSortChange = (sortType) => {
    if (sortType === sortOrder) {
      setIsDescending(!isDescending); // 같은 버튼 클릭 시 방향 변경
    } else {
      setSortOrder(sortType); // 버튼 클릭 시 정렬 타입 변경
      setIsDescending(true); // 기본적으로 아래 화살표로 설정
    }
  };

  const recipes = [
    {
      id: 1,
      title: "돼지고기 볶음",
      ingredients: ["돼지고기"],
      method: "볶음",
      description: "맛있는 돼지고기 볶음 레시피",
    },
    {
      id: 2,
      title: "소고기 찜",
      ingredients: ["소고기"],
      method: "찜",
      description: "부드러운 소고기 찜 레시피",
    },
    {
      id: 3,
      title: "닭고기 구이",
      ingredients: ["닭고기"],
      method: "구이",
      description: "노릇하게 구운 닭고기 레시피",
    },
  ];

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleMethodToggle = (method) => {
    setSelectedMethods((prevSelected) =>
      prevSelected.includes(method)
        ? prevSelected.filter((item) => item !== method)
        : [...prevSelected, method]
    );
  };

  // 필터링된 레시피
  const filteredRecipes = recipes.filter(
    (recipe) =>
      (selectedIngredients.length === 0 ||
        selectedIngredients.every((ingredient) =>
          recipe.ingredients.includes(ingredient.trim())
        )) &&
      (selectedMethods.length === 0 ||
        selectedMethods.includes(recipe.method)) &&
      recipe.title.replace(/\s+/g, "").includes(searchQuery.replace(/\s+/g, ""))
  );

  return (
    <div className="p-5 text-center">
      {/* 검색 입력 박스 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="레시피를 검색하세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 h-10 p-2 border-2 border-orange-500 rounded-full mb-2"
        />
        <span className="material-symbols-outlined">search</span>
      </div>

      <div className="mb-5">
        <button
          className="px-5 py-2 text-white text-lg bg-orange-500 rounded-md mx-2"
          onClick={() => setIngredientModalOpen(true)}
        >
          재료
        </button>
        <button
          className="px-5 py-2 text-white text-lg bg-orange-500 rounded-md mx-2"
          onClick={() => setMethodModalOpen(true)}
        >
          조리방식
        </button>
      </div>

      {/* 재료별 검색 모달 */}
      {isIngredientModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-72 shadow-lg text-left">
            <h2 className="text-lg font-bold mb-4">재료</h2>
            <label className="flex items-center mb-2 whitespace-nowrap">
              돼지고기
              <input
                type="checkbox"
                checked={selectedIngredients.includes("돼지고기")}
                onChange={() => handleIngredientToggle("돼지고기")}
                className="mr-2" // 체크박스와 텍스트 간의 간격을 설정합니다.
              />
            </label>
            <label className="flex items-center mb-2 whitespace-nowrap">
              소고기
              <input
                type="checkbox"
                checked={selectedIngredients.includes("소고기")}
                onChange={() => handleIngredientToggle("소고기")}
                className="mr-2"
              />
            </label>
            <label className="flex items-center mb-2 whitespace-nowrap">
              닭고기
              <input
                type="checkbox"
                checked={selectedIngredients.includes("닭고기")}
                onChange={() => handleIngredientToggle("닭고기")}
                className="mr-2"
              />
            </label>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
              onClick={() => setIngredientModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 조리방식별 검색 모달 */}
      {isMethodModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-72 shadow-lg text-left">
            <h2 className="text-lg font-bold mb-4">조리방식</h2>
            <label className="flex items-center mb-2 whitespace-nowrap">
              볶음
              <input
                type="checkbox"
                checked={selectedMethods.includes("볶음")}
                onChange={() => handleMethodToggle("볶음")}
                className="mr-2"
              />
            </label>
            <label className="flex items-center mb-2 whitespace-nowrap">
              찜
              <input
                type="checkbox"
                checked={selectedMethods.includes("찜")}
                onChange={() => handleMethodToggle("찜")}
                className="mr-2"
              />
            </label>
            <label className="flex items-center mb-2 whitespace-nowrap">
              구이
              <input
                type="checkbox"
                checked={selectedMethods.includes("구이")}
                onChange={() => handleMethodToggle("구이")}
                className="mr-2"
              />
            </label>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
              onClick={() => setMethodModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      <div className="flex flex-col p-5 border-2 border-gray-300 rounded-lg bg-gray-100">
        {/* 버튼들 */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2"
            onClick={() => handleSortChange("정확순")}
          >
            정확순
            {sortOrder === "정확순" && isDescending ? (
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            ) : (
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            )}
          </button>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2"
            onClick={() => handleSortChange("최신순")}
          >
            최신순
            {sortOrder === "최신순" && isDescending ? (
              <span className="material-symbols-outlined">
                keyboard_arrow_down
              </span>
            ) : (
              <span className="material-symbols-outlined">
                keyboard_arrow_up
              </span>
            )}
          </button>
        </div>

        {/* 레시피 목록 */}
        <div className="flex flex-wrap justify-center gap-5">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-5 border border-gray-300 rounded-lg bg-white cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
              </div>
            ))
          ) : (
            <p>선택된 조건에 해당하는 레시피가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 레시피 상세 모달 */}
      {selectedRecipe && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg text-left recipe-detail-modal">
            {/* <img
        src={require(`../assets/images/${selectedRecipe.image}`)}
        alt={selectedRecipe.title}
        className="recipe-image mb-4"
      /> */}
            <div className="recipe-info">
              <h2 className="text-lg font-bold mb-2">{selectedRecipe.title}</h2>
              <p>{selectedRecipe.description}</p>
              <div className="recipe-ingredients mt-3">
                <h3 className="font-semibold">재료:</h3>
                <ul className="list-disc pl-5">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
              onClick={() => setSelectedRecipe(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
