// import { concat } from 'core-js/core/array';
import icons from '../../img/icons.svg';
export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generateHTML();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    //GENERATE NEW DOM
    const newHtml = this._generateHTML();
    const newDom = document.createRange().createContextualFragment(newHtml);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    //GENERATE OLD DOM
    const oldDOM = Array.from(this._parentElement.querySelectorAll('*'));
    //COMPARE NODES
    newElements.forEach((newEL, i) => {
      const curEl = oldDOM[i];
      //CHANGE TEXT
      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEL.textContent;
      }
      //CHANGE ATTRIBUTES
      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  spinner() {
    const html = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderError(errMessage = this._erroMessage) {
    const errDiv = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errMessage}</p>
          </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errDiv);
  }
  renderMessage(message = this._message) {
    const html = `
      <div class="recipe">
        <div class="message">
          <div>
            <svg>
              <use href=${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
