
import React, { useState } from 'react';

interface AddCarFormProps {
  onSubmit: (name: string, color: string) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000'); 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, color);
    setName(''); 
    setColor('#000000'); 
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
