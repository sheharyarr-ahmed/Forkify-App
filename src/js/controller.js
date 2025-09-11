import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "../js/views/paginationView.js";
// console.log(icons);
import "core-js/stable";
import "regenerator-runtime/runtime";
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
    resultsView.render(model.getSearchResultsPage(4));

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
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
