import { categories, recipes } from "./data.js";


// capitalizing first letter for inprovised searching and lowercasing rest to avoid incosistancy
function capitalizeFirstLetter(str) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById("recipeForm").addEventListener("submit", function (e) {
  // e.preventDefault();

  //   Retrieve the existing array from localStorage
  let storedRecipes = JSON.parse(localStorage.getItem("RecipeArray")) || [];
  let storedCategories = JSON.parse(localStorage.getItem("categoriesArray")) || [];

  //  Id for identification of newly added product
  let len = storedRecipes.length + 11;

  //  New Object for newly created recipe
  let recipeData = {
    recipe_id: 11,
    recipe_id: len,
    // excessing all the input fields
    
    recipe_name: capitalizeFirstLetter(document.getElementById("recipe_name").value),
    description: capitalizeFirstLetter(document.getElementById("description").value),
    prep_time: document.getElementById("prep_time").value,
    cook_time: document.getElementById("cook_time").value,
    total_time: document.getElementById("total_time").value,
    servings: document.getElementById("servings").value,

    ingredients: document
      .getElementById("ingredients")
      .value.split(",")
      .map((item) => capitalizeFirstLetter(item.trim())),

    instructions: document
      .getElementById("instructions")
      .value.split(",")
      .map((item) => capitalizeFirstLetter(item.trim())),

    image_url: document.getElementById("image_url").value,

    categories: document
      .getElementById("categories")
      .value.split(",")
      .map((item) => capitalizeFirstLetter(item.trim())),
  };
  // before updating localstorage , checking if info already present or not
  // checking both localstorage and our database

  const isRecipeExists =
    storedRecipes.some(
      (recipe) => recipe.recipe_name === recipeData.recipe_name
    ) ||
    recipes.some((recipe) => recipe.recipe_name === recipeData.recipe_name);

  if (!isRecipeExists) {
    // If recipe doesn't exist, push the new recipe
    storedRecipes.push(recipeData);

    recipeData.categories.forEach((category) => {
      // Checking if the category is already in storedCategories
      const isCategoryExists =
        storedCategories.includes(category) || categories.includes(category);

      // If the category doesn't exist, add it to storedCategories
      if (!isCategoryExists) {
        storedCategories.push(category);
      }
      
    });

    window.alert("Item added SuccessFully")
  } else {
    // data already present , no update made
    console.log("Recipe with the same name already exists.");
  }

  // Saveing the updated array back to localStorage
  localStorage.setItem("RecipeArray", JSON.stringify(storedRecipes));
  localStorage.setItem("categoriesArray", JSON.stringify(storedCategories));
});
