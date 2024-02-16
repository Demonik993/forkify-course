// import {async} from 'regenerator-runtime'
import { API_URL } from './config';
import { getJSON } from './helpers';
import { RES_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async function (key) {
  try {
    const data = await getJSON(`${API_URL}/${key}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === key))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(`🎉 ${err}`);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.page = 1;
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

export const showSearchResults = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (numServings) {
  state.recipe.ingredients.forEach(ing => {
    if (!ing.quantity) return;
    ing.quantity = (ing.quantity * numServings) / state.recipe.servings;
  });
  state.recipe.servings = numServings;
};

const addBookmarksToLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //ADD BOOKMARK
  state.bookmarks.push(recipe);

  //MARK CURRENT RECIPE AS BOOKMARKED
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  //local storage
  addBookmarksToLocalStorage();
};
export const removeBookmark = function (id) {
  //remove BOOKMARK
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //MARK CURRENT RECIPE AS not BOOKMARKED
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  addBookmarksToLocalStorage();
};

const clearBookmark = function () {
  localStorage.clear('bookmarks');
};
// clearBookmark();
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
