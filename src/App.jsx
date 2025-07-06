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
    for (let i = 0; i < 5; i++) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    setShowCard(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden
      bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100 transition-all duration-1000 px-4">
      
      {/* Background Music */}
      <audio ref={audioRef} src={song} loop preload="auto" />

      {/* Particle Balloons & Emojis */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 35 },
            shape: {
              type: "char",
              character: {
                value: ["🎈", "🎉"],
                font: "Verdana",
                weight: "400",
              },
            },
            size: {
              value: 32,
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

      {/* Initial Cake */}
      {!showCard && (
        <>
          <h2 className="text-lg sm:text-xl font-bold text-center mt-4 text-black animate-pulse">
            🎉 Tap the cake to celebrate! 🎉
          </h2>
          <img
            src={cake}
            alt="Birthday Cake"
            onClick={handleCakeClick}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ maxWidth: "1150px", width: "100%", height: "auto" }}
          />
        </>
      )}

      {/* Birthday Card */}
      {showCard && (
        <div className="flex flex-col items-center text-center mt-8 animate-fade-in w-full px-4">
          <img
            src={dad}
            alt="Dad"
            className="w-48 sm:w-56 md:w-60 lg:w-64 h-auto rounded-2xl object-cover border-4 border-pink-400 shadow-lg"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-4 text-purple-800 leading-tight">
            Happy Birthday Daddy! 🎂
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-sm sm:max-w-md">
            Wishing you a day filled with love. I’m forever grateful for your love and support. ❤️
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
