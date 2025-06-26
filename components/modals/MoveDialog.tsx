import React, { useContext, useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FileSystemContext } from '../../contexts/FileSystemContext';
import { SelectionContext } from '../../contexts/SelectionContext';

const MoveDialog = ({ isOpen, onClose }) => {
  const { moveFiles } = useContext(FileSystemContext);
  const { selectedFiles } = useContext(SelectionContext);
  const [destination, setDestination] = useState('');

  const handleMove = () => {
    if (destination) {
      moveFiles(selectedFiles, destination);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Move Files</h2>
        <p className="mt-2">Select a destination to move the selected files.</p>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination path"
          className="mt-2 w-full p-2 border border-gray-300 rounded"
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={handleMove} disabled={!destination}>Move</Button>
        </div>
      </div>
    </Modal>
  );
};

export default MoveDialog;