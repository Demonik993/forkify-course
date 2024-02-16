import View from './view.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _erroMessage = 'The recipe was not found. Please try with another one!';
  _message = '';

  _generateHTML() {
    return this._data.map(rec => previewView.render(rec, false)).join('');
  }
}
export default new ResultsView();
