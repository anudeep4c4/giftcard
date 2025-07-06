import React, { useEffect, useRef, useState } from "react";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import confetti from "canvas-confetti";
import cake from "./assets/cake.png";
import dad from "./assets/dad.png";
import song from "./assets/birthday.mp3";

function App() {
  const [showCard, setShowCard] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Delay music play until user interacts (browser policy)
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((e) => {
          console.warn("Autoplay blocked:", e);
        });
      }
      window.removeEventListener("click", playMusic);
    };
    window.addEventListener("click", playMusic);

    return () => window.removeEventListener("click", playMusic);
  }, []);

  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const handleCakeClick = () => {
    // Confetti blast
    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Show card after confetti (or instantly)
    setShowCard(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden 
  bg-gradient-to-r from-pink-200 via-yellow-100 to-purple-200 
  animate-gradient-x bg-size-200 transition-all duration-1000">

      {/* Audio */}
      <audio ref={audioRef} src={song} loop preload="auto" />

      {/* Particles (balloons & emojis) */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 40 },
            shape: {
              type: "char",
              character: {
                value: ["🎈", "🎉"],
                font: "Verdana",
                style: "",
                weight: "400",
              },
            },
            size: {
              value: 100, // Bigger balloon size
              random: true,
            },
            move: {
              enable: true,
              speed: 1.5,
              direction: "top",
              outModes: { default: "out" },
            },
            opacity: { value: 1 },
          },
        }}
      />

      {!showCard && (
        <>
          <h2 className="text-lg font-bold text-center mt-4 text-black animate-pulse">
            🎉 Tap the cake to celebrate! 🎉
          </h2>
          <img
            src={cake}
            alt="Birthday Cake"
            onClick={handleCakeClick}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: "1200px", width: "100%", height: "auto" }}
          />
        </>
      )}

      {showCard && (
        <div className="flex flex-col items-center text-center mt-8 animate-fade-in">
          <img
            src={dad}
            alt="Dad"
            className="w-60 h-60 rounded-full object-cover border-4 border-pink-400 shadow-lg"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-purple-800 text-center">
  Happy Birthday Daddy! 🎂
</h1>

<p className="mt-4 text-base md:text-lg text-gray-700 px-6 text-center max-w-xl">
  Wishing you a day filled with love. I’m forever grateful for your love and support. ❤️
</p>
        </div>
      )}
    </div>
  );
}

export default App;
