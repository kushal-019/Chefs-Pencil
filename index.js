import { categories, recipes } from "./data.js";

// excessing all the elements from the DOM
let ListAllElement = document.getElementsByClassName("ListAll")[0];
let backButton = document.getElementsByClassName("revButton")[0];
let EachRecipeDetails = document.getElementsByClassName("details")[0];
let FilterButton = document.getElementsByClassName("filter")[0];
let FilterList = document.getElementsByClassName("filterlist")[0];
let searchbar = document.getElementById("searchbar");

// Fetching data and categories present in localstorage
const recipeArray = localStorage.getItem("RecipeArray");
const categoriesArray = localStorage.getItem("categoriesArray");

// updating data from data.js with localstorage recipies data
const currRecipeArray = recipeArray 
? [ ...recipes , ...JSON.parse(recipeArray)] 
: recipes;

// updating categories from data.js with localstorage categories data
const Presentcategories = categoriesArray ?
  [ ...categories , ...JSON.parse(categoriesArray)] 
  : categories;

function displayDropDown() {
  FilterList.innerHTML = "";
  FilterList.classList.add("display");
  FilterList.classList.remove("Hide");

  // Create and append option elements
  Presentcategories.forEach((category) => {
    const option = document.createElement("div");
    option.textContent = category;
    // adding functionallity associated to each option
    option.addEventListener("click", function () {
      const selectedCategory = this.textContent;
      FilterList.classList.add("Hide");
      FilterList.classList.remove("display");
      filterRecipesByCategory(selectedCategory);
    });
    FilterList.appendChild(option);
  });
}

function filterRecipesByCategory(category) {
  // Filter recipes based on selected category

  if (category == "All") {
    ListItems(currRecipeArray);
    return;
  }

  const filteredRecipes = currRecipeArray.filter((recipe) =>
    recipe.categories.includes(category)
  );

  ListItems(filteredRecipes);
}

ListItems(currRecipeArray);

function ListItems(currRecipeArray) {
  // Clear existing list items
  ListAllElement.innerHTML = "";

  currRecipeArray.forEach((element) => {
    // Create list item and set its ID
    const EachRecipe = document.createElement("li");
    EachRecipe.id = element.recipe_id;
    EachRecipe.className = "recipe";

    // Set content using template literals
    EachRecipe.innerHTML = `
            <img class="recipe-image" src="${element.image_url}" alt="${
      element.recipe_name
    }">
            <div class="recipe-name">${element.recipe_name}</div>
            <div class="recipe-description">${element.description}</div>
            <div class="recipe-categories">Categories: ${element.categories.join(
              ", "
            )}</div>
        `;

    // Add click event listener
    EachRecipe.addEventListener("click", function () {
      displayInDetail(this.id - 1);

      // toggling  back button div and detail display of selected item
      backButton.classList.remove("Hide");
      EachRecipeDetails.classList.remove("Hide");
      backButton.classList.add("display");
      EachRecipeDetails.classList.add("display");

      // removing all element displaying div
      ListAllElement.classList.add("Hide");
      ListAllElement.classList.remove("display");
    });

    // Append EachRecipe to ListAllElement
    ListAllElement.appendChild(EachRecipe);
  });
}

function displayInDetail(index) {
  // accessing recipe by index 
  let currRecipe = currRecipeArray[index];

  // Clear existing content
  EachRecipeDetails.innerHTML = "";

  // Create and append elements with template literals
  EachRecipeDetails.innerHTML = `
        <img class="recipe-image" src="${currRecipe.image_url}" alt="${
    currRecipe.recipe_name
  }">
        <div class="recipe-name">${currRecipe.recipe_name}</div>
        <div class="recipe-description">${currRecipe.description}</div>
        <div class="recipe-categories">Categories: ${currRecipe.categories.join(
          ", "
        )}</div>
        <div class="recipe-prep-time">Preparation Time: ${
          currRecipe.prep_time
        }</div>
        <div class="recipe-cook-time">Cooking Time: ${
          currRecipe.cook_time
        }</div>
        <div class="recipe-total-time">Total Time: ${
          currRecipe.total_time
        }</div>
        <div class="recipe-servings">Servings: ${currRecipe.servings}</div>
        <div class="recipe-ingredients">
            <strong>Ingredients:</strong>
            <ul>${currRecipe.ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}</ul>
        </div>
        <div class="recipe-instructions">
            <strong>Instructions:</strong>
            <ul>${currRecipe.instructions
              .map((instruction) => `<li>${instruction}</li>`)
              .join("")}</ul>
        </div>
    `;
}
// event listner to work on search bar querry
searchbar.addEventListener("input", (e) => {
  const val = e.target.value;
  let filteredRecipes = [
    ...currRecipeArray.filter((recipe) => recipe.categories.includes(val)),
    ...currRecipeArray.filter((recipe) => recipe.ingredients.includes(val)),
    ...currRecipeArray.filter((recipe) =>
      recipe.recipe_name.toLowerCase().startsWith(val.toLowerCase())
    ),
  ];

  //   Remove duplicates by converting to a Set and back to an array 
  filteredRecipes = [...new Set(filteredRecipes)];

  // Display the filtered list
  ListItems(filteredRecipes);
});

// Filter button
FilterButton.addEventListener("click", function () {
  displayDropDown();
});

// Button and recipie detail display handler
backButton.addEventListener("click", function (e) {
  backButton.classList.add("Hide");
  EachRecipeDetails.classList.add("Hide");
  backButton.classList.remove("display");
  EachRecipeDetails.classList.remove("display");

  ListAllElement.classList.remove("Hide");
  ListAllElement.classList.add("display");
});
