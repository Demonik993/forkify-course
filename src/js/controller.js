import * as model from './model.js';
import recepieView from './views/recepieView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import icons from 'url:../img/icons.svg'; // nie działa dla parcel bundler 1.

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    await model.loadSearchResults('pizza');
    console.log(model.state.search.results);
  } catch (err) {
    recepieView.renderError();
  }
};
controlSearchResults();

const init = function () {
  recepieView.addHendlerRender(controlRecipes);
};
init();
