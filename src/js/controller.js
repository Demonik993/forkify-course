import * as model from './model.js';
import recepieView from './views/recepieView.js';

import icons from '../img/icons.svg';
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
    alert(err);
  }
};

// showRecipe(`5ed6604591c37cdc054bc886`);
// showRecipe('5ed6604591c37cdc054bca10');
// showRecipe(`5e054bc886`); // to make error
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
