import View from './view.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _erroMessage = 'The recipe was not found. Please try with another one!';
  _message = '';

  _generateHTML() {
    return this._data
      .map(rec => {
        return `
             <li class="preview">
                <a class="preview__link" href="#${rec.id}">
                  <figure class="preview__fig">
                    <img src="${rec.image}" alt=${rec.title} />
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
export default new ResultsView();
