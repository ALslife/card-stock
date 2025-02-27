import React from "react";

const InputForm: React.FC = () => {
  return (
    <form className="flex flex-col space-y-4">
      <label htmlFor="name" className="font-bold">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className="border rounded p-2"
        required
      />

      <label htmlFor="email" className="font-bold">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="border rounded p-2"
        required
      />

      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Submit
      </button>
    </form>
  );
};

export default InputForm;
