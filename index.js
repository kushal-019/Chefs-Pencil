import { categories, recipes } from "./data.js";

// excessing all the elements from the DOM
let ListAllElement = document.getElementsByClassName("ListAll")[0];
let backButton = document.getElementsByClassName("revButton")[0];
let EachRecipeDetails = document.getElementsByClassName("details")[0];
let FilterButton = document.getElementsByClassName("filter")[0];
let FilterList = document.getElementsByClassName("filterlist")[0];
let searchbar = document.getElementById("searchbar");
let crousel = document.getElementById("crousel");
// let hamburgerIcon = document.getElementsByClassName("HamburgerLogo")[0];
// let hamburger = document.getElementsByClassName("Hamburger")[0];
// let links = document.getElementsByClassName("links")[0];



// Fetching data and categories present in localstorage
const recipeArray = localStorage.getItem("RecipeArray");
const categoriesArray = localStorage.getItem("categoriesArray");

// updating data from data.js with localstorage recipies data
const currRecipeArray = recipeArray
  ? [...recipes, ...JSON.parse(recipeArray)]
  : recipes;

// updating categories from data.js with localstorage categories data
const Presentcategories = categoriesArray
  ? [...categories, ...JSON.parse(categoriesArray)]
  : categories;

function displayDropDown() {
  FilterList.innerHTML = "";
  FilterList.classList.remove("Hide");
  Presentcategories.sort();
  // Create and append option elements
  Presentcategories.forEach((category) => {
    const option = document.createElement("div");
    option.className = "filterOption";
    option.textContent = category;
    // adding functionallity associated to each option
    option.addEventListener("click", function () {
      const selectedCategory = this.textContent;
      FilterList.classList.add("Hide");
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
    const EachRecipe = document.createElement("div");
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

      // removing all element displaying div
      ListAllElement.classList.add("Hide");
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

  window.scrollTo({
    top: 400,
    behavior: "smooth",
  });

  // Create and append elements with template literals
  EachRecipeDetails.innerHTML = `
  <div>
        <img class="recipe-image-detail" src="${currRecipe.image_url}" alt="${
    currRecipe.recipe_name
  }">
  <div class="recipe-name-detail">${currRecipe.recipe_name}</div>
        <div class="recipe-description-detail">${currRecipe.description}</div>
        <div class="recipe-categories-detail">Categories: ${currRecipe.categories.join(
          ", "
        )}</div>
  </div><div>
        
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
      <div>
    `;
}
// event listner to work on search bar querry
searchbar.addEventListener("input", (e) => {
  const val = capitalizeFirstLetter(e.target.value); // Convert value to lowercase once
  let filteredRecipes = currRecipeArray.filter((recipe) => {
    return (
      recipe.categories.includes(val) ||
      // Check categories
      recipe.ingredients.includes(val) ||
      // Check ingredients
      recipe.recipe_name.toLowerCase().startsWith(val.toLowerCase())
      // Check recipe name
    );
  });

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

  ListAllElement.classList.remove("Hide");
});

// capitalizing first letter for inprovised searching and lowercasing rest to avoid incosistancy
function capitalizeFirstLetter(str) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

displayCrousel();

function displayCrousel() {
  let crouselArray = [
    ["https://sandinmysuitcase.com/wp-content/uploads/2021/01/Popular-Indian-Food-Dishes.jpg.webp", "Indian"],
    ["https://d2lswn7b0fl4u2.cloudfront.net/photos/pg-italian-dishes-1645372086.jpg", "Italian"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGbjz_oNDeLw-7AX5n4yWv26Ki0OhN8_eAew&s.png", "Mexican"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxJAgRXI4GIwIX_e0rwdoQfhhzwEbvH37gA&s.png", "French"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH7oxiuHVwbwgNCIYCKvIbzoeQLkAnB4-Ieg&s.png", "Thai"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1LHnL_oCLsieMatEdAERNLW4cT40DQ-Mw&s.png", "American"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIK5whvL8FPoLXyPbMnePCEbpa82X0ZA0rkA&s.png", "Japanese"],
    ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUUfPtf4KypR_CLC9a9QgSfhez1u2E0p4pOA&s.png", "Chinese"],
  ];

  crouselArray.forEach((item) => {
    let EachItem = document.createElement("div");
    EachItem.className = "crouselItems";
    EachItem.dataset.value = item[1];

    EachItem.innerHTML = `
      <img class="crouselImage" src="${item[0]}" />
      <p>${item[1]}</p>`;

      // Add click event listener
      EachItem.addEventListener("click", function () {
        filterRecipesByCategory(this.dataset.value);
      });

      crousel.appendChild(EachItem);
  });
}

// Select hamburger logo and menu
const hamburgerLogo = document.querySelector('.HamburgerLogo');
const hamburgerItems = document.querySelector('.HamburgerItems');
const backHamburger = document.querySelector('.backButton');

// Show the menu when the hamburger is clicked
hamburgerLogo.addEventListener('click', () => {
  hamburgerItems.classList.add('show');
});

// Hide the menu when the back button is clicked
backHamburger.addEventListener('click', () => {
  hamburgerItems.classList.remove('show');
});
