import icons from "url:../../img/icons.svg";
export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear(); // clear content
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError(); not needed
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // updating DOM algorithm
    // console.log(newElements);
    // console.log(curElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!curEl) return;
      // console.log(curEl, newEl.isEqualNode(curEl));
      //UPDATES CHANGED TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("👉🏻", newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      //UPDATES CHANGED ATTIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear(); // clear content
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
    this._clear(); // clear content
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
