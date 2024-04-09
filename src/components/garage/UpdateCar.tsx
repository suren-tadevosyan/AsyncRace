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
    <div className=" p-6 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-2  items-center"
      >
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="flex-grow px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="color"
            id="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="w-7 h-7 rounded-lg border border-gray-600 bg-gray-700 focus:outline-none focus:border-blue-500 pointer"
            required
          />
        </div>

        <button
          type="submit"
          className=" text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300 border border-pink-600"
        >
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditCarForm;
