import * as model from './model.js';
import recepieView from './views/recepieView.js';
import serchingView from './views/serchingView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from 'url:../img/icons.svg'; // nie działa dla parcel bundler 1.

const controlRecipes = async function () {
  try {
    const key = window.location.hash.slice(1);

    if (!key) return;

    //show spinner
    recepieView.spinner();
    // Load data
    await model.loadRecipe(key);
    // Inner HTML
    recepieView.render(model.state.recipe);
  } catch (err) {
    recepieView.renderError();
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
  }
};
// controlSearchResults();
const controlPagination = function (goToPage) {
  //show results
  resultsView.render(model.showSearchResults(goToPage));

  //render pagination
  paginationView.render(model.state.search);
};
const init = function () {
  recepieView.addHendlerRender(controlRecipes);
  serchingView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
