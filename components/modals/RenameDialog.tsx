import React, { useState, useContext } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import { FileSystemContext } from '../../contexts/FileSystemContext';
import { FileItem } from '../../types/file';

interface RenameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileItem | null;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ isOpen, onClose, file }) => {
  const [newName, setNewName] = useState<string>(file ? file.name : '');
  const { renameFile } = useContext(FileSystemContext);

  const handleRename = () => {
    if (file) {
      renameFile(file.id, newName);
      onClose();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Rename File">
      <div className="p-4">
        <Input
          value={newName}
          onChange={handleInputChange}
          placeholder="Enter new file name"
          aria-label="New file name"
        />
      </div>
      <div className="flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleRename}
          disabled={!newName.trim()}
        >
          Rename
        </button>
        <button
          className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RenameDialog;