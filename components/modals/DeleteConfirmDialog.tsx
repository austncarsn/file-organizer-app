import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="mr-2" variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmDialog;