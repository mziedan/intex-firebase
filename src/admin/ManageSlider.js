import { useEffect, useState } from "react";

const ManageSlider = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newQuote, setNewQuote] = useState("");

  const fetchSliderItems = async () => {
    const response = await fetch("/slider");
    const data = await response.json();
    setSliderItems(data);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleCreateSliderItem = async () => {
    const formData = new FormData();
    if (newImage) {
      formData.append("image", newImage, newImage.name);
    }
    formData.append("quote", newQuote);
    console.log(newImage)
    await fetch("/slider", {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    });
    setNewImage("");
    setNewQuote("");
    fetchSliderItems();
  };

  const handleDeleteSliderItem = async (id) => {
    await fetch(`/slider/${id}`, {
      method: "DELETE",
    });
    fetchSliderItems();
  };

  const handleUpdateSliderItem = async (id, image, quote) => {
    await fetch(`/slider/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, quote }),
    });
    fetchSliderItems();
  };

  useEffect(() => {
    fetchSliderItems();
  }, []);

  return (
    <section className="manage-slider">
      <h2>Manage Slider</h2>
      <div className="slider-form">
      <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* <input
          type="text"
          value={newImage}
          placeholder="New Image URL" 
        />
        <input
          type="text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="New Quote"
        />
        <button onClick={handleCreateSliderItem}>Add Slider Item</button>
      </div>
      <div className="slider-items">
        {sliderItems.map((item) => (
          <div key={item.id} className="slider-item">
            <img src={item.image} alt={item.quote} />
            <p>{item.quote}</p>
            <button onClick={() => handleDeleteSliderItem(item.id)}>
              Delete
            </button>
            <button onClick={() => handleUpdateSliderItem(item.id, prompt("New Image URL", item.image), prompt("New Quote", item.quote))}>
              Update
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ManageSlider;