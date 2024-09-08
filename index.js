import { categories, recipes } from "./data.js";

let ListAllElement = document.getElementsByClassName("ListAll")[0];
let backButton = document.getElementsByClassName("revButton")[0];
let EachRecipeDetails = document.getElementsByClassName("details")[0];
let FilterButton = document.getElementsByClassName("filter")[0];


const recipeArray = localStorage.getItem("RecipeArray");
const currRecipeArray = recipeArray ? JSON.parse(recipeArray) : recipes;

const categoriesArray = localStorage.getItem("categoriesArray");
const Presentcategories = categoriesArray ? JSON.parse(categoriesArray) : categories;


function displayDropDown(){

    // Create the select element
    const selectElement = document.createElement('div');
    selectElement.id = 'categoryDropdown'; // Set ID for future reference

    // Create and append option elements
    Presentcategories.forEach(category => {
        const option = document.createElement('div');
        option.textContent = category;
        option.addEventListener('click', function () {
            const selectedCategory = this.textContent;
            filterRecipesByCategory(selectedCategory);
        });
        selectElement.appendChild(option);
    });

    // Clear any existing content and append the new select element
    FilterButton.innerHTML = '';
    FilterButton.appendChild(selectElement);
}


function filterRecipesByCategory(category) {

    // Filter recipes based on selected category
    const filteredRecipes = currRecipeArray.filter(recipe =>
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
            <img class="recipe-image" src="${element.image_url}" alt="${element.recipe_name}">
            <div class="recipe-name">${element.recipe_name}</div>
            <div class="recipe-description">${element.description}</div>
            <div class="recipe-categories">Categories: ${element.categories.join(", ")}</div>
        `;

        // Add click event listener
        EachRecipe.addEventListener("click", function () {
            displayInDetail(currRecipeArray[this.id -1]);

            backButton.classList.remove("Hide");
            EachRecipeDetails.classList.remove("Hide");
            backButton.classList.add("display");
            EachRecipeDetails.classList.add("display");
            ListAllElement.classList.add("Hide");
            ListAllElement.classList.remove("display");
        });

        // Append EachRecipe to ListAllElement
        ListAllElement.appendChild(EachRecipe);
    });
}


function displayInDetail(currRecipe) {

    // Clear existing content
    EachRecipeDetails.innerHTML = "";

    // Create and append elements with template literals
    EachRecipeDetails.innerHTML = `
        <img class="recipe-image" src="${currRecipe.image_url}" alt="${currRecipe.recipe_name}">
        <div class="recipe-name">${currRecipe.recipe_name}</div>
        <div class="recipe-description">${currRecipe.description}</div>
        <div class="recipe-categories">Categories: ${currRecipe.categories.join(", ")}</div>
        <div class="recipe-prep-time">Preparation Time: ${currRecipe.prep_time}</div>
        <div class="recipe-cook-time">Cooking Time: ${currRecipe.cook_time}</div>
        <div class="recipe-total-time">Total Time: ${currRecipe.total_time}</div>
        <div class="recipe-servings">Servings: ${currRecipe.servings}</div>
        <div class="recipe-ingredients">
            <strong>Ingredients:</strong>
            <ul>${currRecipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        </div>
        <div class="recipe-instructions">
            <strong>Instructions:</strong>
            <ul>${currRecipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ul>
        </div>
    `;
}


FilterButton.addEventListener("click" , function(){
    displayDropDown();
})

backButton.addEventListener("click", function (e) {
  backButton.classList.add("Hide");
  EachRecipeDetails.classList.add("Hide");
  backButton.classList.remove("display");
  EachRecipeDetails.classList.remove("display");


  ListAllElement.classList.remove("Hide");
  ListAllElement.classList.add("display");
});
