// import {async} from 'regenerator-runtime'
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
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
  }
};
