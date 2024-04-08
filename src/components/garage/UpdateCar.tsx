import React, { useState } from "react";

interface EditCarFormProps {
  carId: number;
  initialName: string;
  initialColor: string;
  onSubmit: (carId: number, name: string, color: string) => void;
}

const EditCarForm: React.FC<EditCarFormProps> = ({
  carId,
  initialName,
  initialColor,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(carId, name, color);
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

      <button type="submit">Update Car</button>
    </form>
  );
};

export default EditCarForm;
