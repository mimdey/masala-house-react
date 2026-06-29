import { useState } from "react";

import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import food4 from "../assets/food4.jpg";
import food5 from "../assets/food5.jpg";
import food6 from "../assets/food6.jpg";

const images = [food1, food2, food3, food4, food5, food6];

function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <main className="page-section container text-center">
      <h1 className="page-title">Gallery</h1>
      <p className="page-subtitle">A look at our food and restaurant atmosphere.</p>

      <div className="gallery-slider d-flex align-items-center justify-content-center gap-3">
        <button className="btn btn-warning rounded-circle" onClick={prevSlide}>
          ❮
        </button>

        <img src={images[currentImage]} alt="Masala House Gallery" className="gallery-img" />

        <button className="btn btn-warning rounded-circle" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </main>
  );
}

export default Gallery;