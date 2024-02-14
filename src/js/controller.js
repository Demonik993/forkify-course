import * as model from './model.js';
import recepieView from './views/recepieView.js';
import serchingView from './views/serchingView.js';
import resultsView from './views/resultsView.js';

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
    console.log(resultsView);

    // Get search query
    const query = serchingView.getQuery();
    if (!query) return;
    // load data
    await model.loadSearchResults(query);

    resultsView.render(model.showSearchResults());
  } catch (err) {
    recepieView.renderError();
  }
};
// controlSearchResults();

const init = function () {
  recepieView.addHendlerRender(controlRecipes);
  serchingView.addHandlerSearch(controlSearchResults);
};
init();
