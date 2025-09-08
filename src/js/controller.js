import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
// console.log(icons);
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
  } catch (err) {
    alert(err);
  }
};

// controlRecipes();
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
["hashchange", "load"].forEach((ev) => addEventListener(ev, controlRecipes));
