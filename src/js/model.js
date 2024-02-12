// import {async} from 'regenerator-runtime'
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};
export const loadRecipe = async function (key) {
  try {
    const data = await getJSON(`${API_URL}/${key}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };
  } catch (err) {
    console.error(`🎉 ${err}`);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`🎉 ${err}`);
    throw err;
  }
};
// loadSearchResults('pizza');
