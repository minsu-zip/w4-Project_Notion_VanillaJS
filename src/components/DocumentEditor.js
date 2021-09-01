import { debounce } from '../utils/functions.js';
import { fetchPutDocument } from '../utils/api.js';
import { createElement } from '../utils/dom.js';
import { checkIsEmptyThrowError, checkUseConstructorFunction, isEmptyObject } from '../utils/validator.js';
import { parseMarkDown } from '../utils/functions.js';
import {
  DEBOUNCE_DELAY,
  EDITOR_DATA_CHANGED,
  CLASS_NAME_DOCUMENT_TITLE,
  CLASS_NAME_DOCUMENT_EDITOR,
  CLASS_NAME_DISPLAY_NONE,
  CLASS_NAME_EMPTY_EDIT_PAGE_MESSAGE,
  CLASS_NAME_EDITOR_CONTAINER,
  MSG_PLACEHOLDER_TITLE,
  MSG_PLACEHOLDER_EDITOR,
  MSG_EMPTY_EDIT_PAGE,
} from '../utils/constants.js';

export default function DocumentEditor({ $target, initialState }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentEditor);
    checkIsEmptyThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $title = createElement('input');
  const $editorContainer = createElement('div');
  const $editor = createElement('textarea');
  const $editorPreview = createElement('div');
  const $emptyPageMessage = createElement('p');

  $emptyPageMessage.textContent = MSG_EMPTY_EDIT_PAGE;
  $emptyPageMessage.className = CLASS_NAME_EMPTY_EDIT_PAGE_MESSAGE;
  $title.type = 'text';
  $title.name = 'title';
  $title.className = CLASS_NAME_DOCUMENT_TITLE;
  $title.placeholder = MSG_PLACEHOLDER_TITLE;
  $editorContainer.classList = CLASS_NAME_EDITOR_CONTAINER;
  $editor.name = 'content';
  $editor.className = CLASS_NAME_DOCUMENT_EDITOR;
  $editor.classList.add(CLASS_NAME_DISPLAY_NONE);
  $editor.placeholder = MSG_PLACEHOLDER_EDITOR;
  $editorPreview.contentEditable = 'false';
  $editorPreview.className = CLASS_NAME_DOCUMENT_EDITOR;

  $editorContainer.appendChild($editor);
  $editorContainer.appendChild($editorPreview);

  $target.appendChild($title);
  $target.appendChild($editorContainer);

  this.setState = nextState => {
    validate(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (isEmptyObject(this.state)) {
      $title.classList.add(CLASS_NAME_DISPLAY_NONE);
      $editor.classList.add(CLASS_NAME_DISPLAY_NONE);
      $editorPreview.classList.add(CLASS_NAME_DISPLAY_NONE);

      $target.appendChild($emptyPageMessage);
      return;
    }

    $emptyPageMessage.remove();
    $title.classList.remove(CLASS_NAME_DISPLAY_NONE);
    $editor.classList.remove(CLASS_NAME_DISPLAY_NONE);
    $editorPreview.classList.remove(CLASS_NAME_DISPLAY_NONE);

    const { content, title } = this.state;

    $title.value = title;
    $editor.value = content;
    $editorPreview.innerHTML = parseMarkDown(this.state.content);
  };

  this.init = () => {
    $target.addEventListener(
      'keyup',
      debounce(async e => {
        const { value, name } = e.target;
        const { id, title } = this.state;
        const nextState = { ...this.state, [name]: value };

        let body = { title: nextState.title, content: nextState.content };

        await fetchPutDocument(id, body);

        this.setState(nextState);

        if (title !== $title.value) {
          window.dispatchEvent(new CustomEvent(EDITOR_DATA_CHANGED));
        }
      }, DEBOUNCE_DELAY)
    );
  };

  this.init();
}
