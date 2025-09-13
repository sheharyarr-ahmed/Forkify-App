import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import bookmarksView from "./views/bookmarksView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "../js/views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";
// console.log(icons);
import "core-js/stable";
import "regenerator-runtime/runtime";
import { MODAL_CLOSE_SEC } from "../js/config.js";
// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector(".recipe");

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// const renderSpinner = function (parentEl) {
//   const markup = `<div class="spinner">
//     <svg>
//       <use href="${icons}#icon-loader"></use>
//     </svg>
//   </div>`;
//   parentEl.innerHTML = ""; // clear content
//   parentEl.insertAdjacentHTML("afterbegin", markup);
// };
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    //0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //updating bookmarks view
    bookmarksView.update(model.state.bookmarks);
    // 1. loading the recipe
    await model.loadRecipe(id); //this laodREcipe fucntion is coming from loadrecipe aysnc function which is an async function which will return an promise.
    // const { recipe } = model.state;

    // 2. rendering the recipe
    recipeView.render(model.state.recipe);
    // for test only
    // controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 0.update results view to amrk selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. load search results
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    // 3. render search results
    console.log("Full results:", model.state.search.results); // 59
    console.log("Paginated results:", model.getSearchResultsPage(5));
    resultsView.render(model.getSearchResultsPage(1));

    // 4. render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();

// controlRecipes();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
//the below init function is an publisher subscriber design pattern implmentation, where this event this is being handled in controller and the event will be listened in the view, which in this case is recipeView
const controlPagination = function (goToPage) {
  // console.log(goToPage);
  // 1. RENDER NEW RESULTS
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. RENDER NEW PAGINATION BUTTONS
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in state)
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1. add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  //2. update recipe view
  recipeView.update(model.state.recipe);
  //3. update recipe view
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //SHOW LOADING SPINNER
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //RENDER ECIPE
    recipeView.render(model.state.recipe);
    // success message
    addRecipeView.renderMessage();
    //CLOSE FORM WINDOW
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💣", err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUplaod(controlAddRecipe);
};
init();
