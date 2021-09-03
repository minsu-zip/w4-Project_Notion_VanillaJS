export default function Editor({ $target, inititalState, onEditing }) {
  let isInitializer = false;

  this.state = inititalState;

  const $editor = document.createElement('div');
  $target.appendChild($editor);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (!isInitializer) {
      $editor.innerHTML = `
        <input type='text' name = 'title' style='width:600px' value='${this.state.title}'/>
        <textarea contentEditable='true' name='content' style='width:600px;height:600px;border:1px solid black;'>${this.state.content}</textarea>
        `;
      isInitializer = true;
    }
  };
  this.render();

  $editor.addEventListener('keydown', e => {
    const { target } = e;
    const name = target.getAttribute('name');
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
