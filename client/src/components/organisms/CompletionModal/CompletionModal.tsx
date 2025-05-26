// src/components/organisms/CompletionModal/CompletionModal.tsx
import React from 'react';
import Modal from 'react-modal';
import CompletionForm from '@components/molecules/CompletionForm/CompletionForm'; 

interface CompletionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  completionMessage: string;
  onCompletionMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onRequestClose,
  completionMessage,
  onCompletionMessageChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Complete Task"
      className="completion-modal"
      overlayClassName="completion-modal-overlay"
    >
      <div className="completion-modal__header">Complete Task</div>
      <CompletionForm
        completionMessage={completionMessage}
        onCompletionMessageChange={onCompletionMessageChange}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default CompletionModal;
