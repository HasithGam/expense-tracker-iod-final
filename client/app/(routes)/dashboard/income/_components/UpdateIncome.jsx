"use client";
import React from 'react';
import PropTypes from 'prop-types';

const UpdateIncome = ({ row, isOpen, onClose, onSave, onChange }) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={onSave}>
          {Object.keys(row).map((key) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={row[key]}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

UpdateIncome.propTypes = {
  row: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UpdateIncome;
