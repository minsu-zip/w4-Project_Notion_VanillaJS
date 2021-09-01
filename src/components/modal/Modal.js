import { initShowModalEmitter, createDocument } from '../../utils/emitter.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target, initialState }) {
	const $modal = $createElement('div');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');
	addClassAll($modal, 'modal-container', 'hide');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		modalBody.setState();
	};

	const toggleModal = isShow => {
		if (isShow) {
			$modal.classList.remove('hide');
		} else {
			$modal.classList.add('hide');
		}
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				console.log('페이지로 열기');
			},
			closeModal: () => {
				toggleModal(false);
			},
		},
	});

	const modalBody = new ModalBody({
		$target: $modalBody,
		initialState,
		onCreate: {
			createDocument: document => {
				createDocument(document);
			},
		},
		onEdit: {
			editTitle: title => {
				console.log('edit:', title);
			},
			editContent: content => {
				console.log('edit:', content);
			},
		},
	});
	initShowModalEmitter(() => toggleModal(true));

	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);
}
