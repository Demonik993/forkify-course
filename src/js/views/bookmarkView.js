import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _erroMessage = 'No recipe found, please find something you like! 🥘';
  _message = '';

  _generateHTML() {
    return this._data
      .map(rec => {
        const id = window.location.hash.slice(1);
        return `
             <li class="preview">
                <a class="preview__link ${
                  rec.id === id ? 'preview__link--active' : ''
                }" href="#${rec.id}">
                  <figure class="preview__fig">
                    <img src="${rec.imageUrl}" alt=${rec.title} />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${rec.title}</h4>
                    <p class="preview__publisher">${rec.publisher}n</p>
                  </div>
                </a>
              </li>
        `;
      })
      .join('');
  }
}
export default new BookmarksView();
