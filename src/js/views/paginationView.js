import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateHTML() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log('numPages:' + numPages);

    // We are on the firt page and we have more pages
    if (currentPage === 1 && numPages > 1) return this._nextButton(currentPage);
    // We are on the firt page and we have no more pages
    if (currentPage === 1 && numPages === 1) return '';
    // We are on the last page
    if (currentPage === numPages && numPages > 1)
      return this._prevButton(currentPage);

    // We are on the other page
    if (currentPage < numPages)
      return `  ${this._prevButton(currentPage)}
                ${this._nextButton(currentPage)}
                `;
  }
  _nextButton(currentPage) {
    return `
    <button class="btn--inline pagination__btn--next">
                    <span>Page ${currentPage + 1}</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
    `;
  }
  _prevButton(currentPage) {
    return `
    <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>
    `;
  }
}

export default new PaginationView();
