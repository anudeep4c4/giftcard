import React from "react";
import dad from "../assets/dad.png";

function Card() {
  return (
    <div className="text-center p-6 rounded-3xl bg-white bg-opacity-50 shadow-2xl max-w-md animate__animated animate__zoomIn">
      <img
        src={dad}
        alt="Dad"
        className="w-64 h-auto rounded-xl shadow-lg animate__animated animate__fadeInDown sm:w-80 md:w-96 max-w-full"
      />
      <h1 className="text-2xl font-bold text-pink-700 mb-2">Happy Birthday Dad! 🎉</h1>
      <p className="text-gray-800 font-medium">
        Wishing you a day filled with love, laughter, and joy. You mean the world to me and I'm forever grateful for your love and support. ❤️
      </p>
    </div>
  );
}

export default Card;