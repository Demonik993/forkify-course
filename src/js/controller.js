import * as model from './model.js';
import recepieView from './views/recepieView.js';
import serchingView from './views/serchingView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipe from './views/addRecipe.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from 'url:../img/icons.svg'; // nie działa dla parcel bundler 1.

const controlRecipes = async function () {
  try {
    const key = window.location.hash.slice(1);

    if (!key) return;

    //show spinner
    recepieView.spinner();
    //update bookmark
    //update results list to markuppage
    resultsView.update(model.showSearchResults());
    // Load data
    await model.loadRecipe(key);
    // Inner HTML
    recepieView.render(model.state.recipe);
    console.log(model.state.recipe);

    bookmarkView.update(model.state.bookmarks);
    // controlServings();
  } catch (err) {
    recepieView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.spinner();

    // Get search query
    const query = serchingView.getQuery();
    if (!query) return;
    // load data
    await model.loadSearchResults(query);
    //show results
    resultsView.render(model.showSearchResults());

    //render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    recepieView.renderError();
    console.error(err);
  }
};
// controlSearchResults();
const controlPagination = function (goToPage) {
  //show results
  resultsView.render(model.showSearchResults(goToPage));

  //render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  // Update recepie servings in state
  model.updateServings(servings);
  //update recepie View
  recepieView.update(model.state.recipe);
};

const controlAddBookMarked = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recepieView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};
const addNewRecipe = async function (newRecipe) {
  try {
    //UPLOAD NEW RECIPE
    await model.uploadRecipe(newRecipe);
    model.uploadNewRecipe(newRecipe)

  } catch (err) {
    console.error(err);
    addRecipe.renderError(err.message);
  }
};

const init = function () {
  recepieView.addHendlerRender(controlRecipes);
  recepieView.addHendlerServings(controlServings);
  recepieView.addHandlerBookmark(controlAddBookMarked);
  serchingView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarkView.addHandlerLoad(controlBookmarks);
  addRecipe.addHandlerSendForm(addNewRecipe);
};
init();
