import DocsList from "./DocsList.js";
import { request } from "./api.js";
import { push } from "./router.js";

export default function DocsPage({ $target }) {
    const $page = document.createElement('div');
    $page.className = 'docs-page';
    $target.appendChild($page);


    const $addDocButton = document.createElement('button');
    $addDocButton.id = 'addDocButton';
    $addDocButton.innerHTML = '<i class="fas fa-plus"></i>';
    $page.appendChild($addDocButton);

    $addDocButton.addEventListener('click', async () => {
        const createdRootDoc = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
                "title": '',
                "parent": null
            })
        });

        push(`/documents/${createdRootDoc.id}`);
        this.setState();
    })

    const docslist = new DocsList({
        $target: $page,
        initialState: {
            docs: []
        },
        onCreateNewDoc: async (id) => {
            const createdDoc = await request('/documents', {
                method: 'POST',
                body: JSON.stringify({
                    "title": '',
                    "parent": id
                })
            });

            history.replaceState(null, null, `/documents/${createdDoc.id}`);

            push(`/documents/${createdDoc.id}`);
            this.setState();
        },
        onRemoveDoc: async (id) => {
            await request(`/documents/${id}`, {
                method: 'DELETE'
            })

            const { pathname } = window.location;
            const currentId = parseInt(pathname.split('/')[2]);

            //현재 편집기 문서를 삭제하고 새로고침할 경우 없는 페이지가 되므로 /로 변경
            if (currentId === id) {
                history.replaceState(null, null, '/');
            }

            this.setState();
        }
    })

    this.setState = async () => {
        const docs = await request('/documents');

        docslist.setState(docs.sort((a, b) => a.id - b.id));
    }

}
