import View from './view.js';
import previewView from './previewView.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
  _btnCloseModal = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerAddRecipe();
    this._closeFormWindow();
  }

  _toggleClass() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerAddRecipe() {
    this._btnAddRecipe.addEventListener('click', this._toggleClass.bind(this));
  }

  _closeFormWindow() {
    this._btnCloseModal.addEventListener('click', this._toggleClass.bind(this));
    this._overlay.addEventListener('click', this._toggleClass.bind(this));
  }

  addHandlerSendForm(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //get form data
      const data = Object.fromEntries(dataArr); // create Object from array
      handler(data);
    });
  }
}
export default new AddRecipeView();
