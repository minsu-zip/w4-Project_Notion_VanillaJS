export default function EditorPage({
  $target,
  ininialState,
  onSave,
  onRemove,
  onSelecte,
  onMove,
}) {
  const $editorPage = document.createElement("div");
  $editorPage.className = "editorPage";
  $target.appendChild($editorPage);

  this.state = ininialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state) {
      $editorPage.innerHTML = `<div calss="editor-empty-page">왼쪽에서 문서를 선택해주세요.</div>`;
      return;
    }
    $editorPage.innerHTML = `
        <button class ="delete">삭제</button>
        <div class ="content-id"contenteditable="true">${this.state.id}</div>
        <textarea class= "editor-title">${this.state.title}</textarea>
        <textarea class= "editor-content">${this.state.content}</textarea>
        <div class="child-documents-container"></div>
`;
    const childContainer = document.querySelector(".child-documents-container");

    childContainer.innerHTML = `
        
          ${
            this.state.documents
              ? this.state.documents
                  .map((document) => {
                    return `<span id="${document.id}" class ="child-document">${document.title}</span>`;
                  })
                  .join("")
              : ""
          }
        `;
  };
  let debounce = null;

  $editorPage.addEventListener("keyup", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const title = $editorPage.querySelector(".editor-title").value;
      const content = $editorPage.querySelector(".editor-content").value;
      onSave({ title, content, id: this.state.id });
    }, 500);
  });

  $editorPage.addEventListener("click", (e) => {
    const clickedButton = e.target.id;
    const isDeleteButton = e.target.className === "delete";
    if (clickedButton) onSelecte(e.target.id);
    if (isDeleteButton) onRemove(this.state.id);
  });
  this.render();
}
