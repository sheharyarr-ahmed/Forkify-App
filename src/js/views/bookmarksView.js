import View from "../views/view.js";
import icons from "url:../../img/icons.svg"; //the way to import static files for the parcel
import previewView from "../views/previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage =
    "No bookmarks yet, find a good recipe and add it as an bookmark";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
