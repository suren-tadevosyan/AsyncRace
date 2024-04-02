// src/components/garage/AddCarForm.tsx

import React, { useState } from 'react';

interface AddCarFormProps {
  onSubmit: (name: string, color: string) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000'); // Default color: black

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, color);
    setName(''); // Reset input fields after submission
    setColor('#000000'); // Reset color picker after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Car Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="color">Car Color:</label>
      <input
        type="color"
        id="color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
        required
      />

      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCarForm;
