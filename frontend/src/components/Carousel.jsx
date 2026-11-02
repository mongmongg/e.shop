import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ButtonIcon from "./UI/ButtonIcon";

export default function Carousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePreviousClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length : prevIndex - 1,
    );
  };
  const handleNextIndex = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextIndex();
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentImageIndex, handleNextIndex]);

  return (
    <>
      <ul className="rounded-2xl overflow-hidden h-full w-full object-top object-cover">
        {images.map((img) => (
          <li key={img.id}>
            <motion.img
              src={img.url}
              initial={{ opacity: 0.6 }}
              whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
              className={currentImageIndex !== img.id ? "hidden" : ""}
            ></motion.img>
          </li>
        ))}
      </ul>
      <div className="absolute right-14 top-12 flex gap-2">
        <ButtonIcon onClick={handlePreviousClick}>
          <FaChevronLeft />
        </ButtonIcon>
        <ButtonIcon onClick={handleNextIndex}>
          <FaChevronRight />
        </ButtonIcon>
      </div>
    </>
  );
}
