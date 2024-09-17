// import {currRecipeArray} from "./index.js";

document.getElementById("recipeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const recipeData = {
    recipe_id: 11,
    //   recipe_id: currRecipeArray.length +1,
    recipe_name: document.getElementById("recipe_name").value,
    description: document.getElementById("description").value,
    prep_time: document.getElementById("prep_time").value,
    cook_time: document.getElementById("cook_time").value,
    total_time: document.getElementById("total_time").value,
    servings: document.getElementById("servings").value,

    ingredients: document
      .getElementById("ingredients")
      .value.split(",")
      .map((item) => item.trim()),

    instructions: document
      .getElementById("instructions")
      .value.split(",")
      .map((item) => item.trim()),

    image_url: document.getElementById("image_url").value,

    categories: document
      .getElementById("categories")
      .value.split(",")
      .map((item) => item.trim()),
  };
  const newRecipeData = JSON.stringify(recipeData);

  //   Retrieve the existing array from localStorage
  let storedRecipes = JSON.parse(localStorage.getItem("RecipeArray")) || [];

  // Append new recipe data to the array
  storedRecipes.push(newRecipeData); 

  // Save the updated array back to localStorage
  localStorage.setItem("RecipeArray", JSON.stringify(storedRecipes));
});

// export default currRecipeArray;
