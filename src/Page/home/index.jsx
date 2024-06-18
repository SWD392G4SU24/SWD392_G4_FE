import React from "react";
import Carousel from "../carousel";

function HomePage() {
  return (
    <div className="dark:bg-black/85 dark:text-white">
      <Carousel numOfSlide={1} />
    </div>
  );
}

export default HomePage;
