import React, { useState } from "react";

interface AddCarFormProps {
  onSubmit: (name: string, color: string) => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, color);
    setName("");
    setColor("#000000");
  };

  return (
    <div className=" p-6 rounded-lg ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between gap-2  items-center"
      >
        <div className="flex items-center gap-2  w-full">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="flex px-3 py-2 rounded-lg border border-gray-600  bg-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter car name"
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
          className=" text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 border border-green-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
