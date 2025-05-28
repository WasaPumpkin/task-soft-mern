// src/components/organisms/DeleteModal/DeleteModal.tsx
import React from 'react';
import Modal from 'react-modal';
import Button from '@components/atoms/Button/Button';

interface DeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Delete"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal__header">Confirm Delete</div>
      <div className="modal__body">
        <p>Are you sure you want to delete this task?</p>
      </div>
      <div className="modal__actions">
        <Button onClick={onConfirm}>Yes, Delete</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
