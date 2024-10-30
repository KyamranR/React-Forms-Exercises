import { useState } from "react";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = { width: "", height: "", backgroundColor: "#000000" };

  const [formData, setFromData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBox({ ...formData, id: Date.now().toString() });
    setFromData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="width">Width:</label>
      <input
        type="text"
        id="width"
        name="width"
        value={formData.width}
        onChange={handleChange}
      />

      <label htmlFor="height">Height:</label>
      <input
        type="text"
        id="height"
        name="height"
        value={formData.height}
        onChange={handleChange}
      />

      <label htmlFor="backgroundColor">Background Color:</label>
      <input
        type="color"
        id="backgroundColor"
        name="backgroundColor"
        value={formData.backgroundColor}
        onChange={handleChange}
      />

      <button>Add Box</button>
    </form>
  );
};

export default NewBoxForm;
