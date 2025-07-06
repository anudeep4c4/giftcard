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
    bg-gradient-to-r from-pink-200 via-yellow-100 to-purple-200 animate-gradient-x bg-size-200">

      {/* Music */}
      <audio ref={audioRef} src={song} loop preload="auto" />

      {/* Balloons + emojis */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 30 },
            shape: {
              type: "char",
              character: {
                value: ["🎈", "🎉"],
                font: "Verdana",
                weight: "400",
              },
            },
            size: {
              value: 40,
              random: { enable: true, minimumValue: 20 },
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "top",
              outModes: { default: "out" },
            },
            opacity: { value: 1 },
          },
        }}
      />

      {!showCard && (
        <>
          <h2 className="text-xl md:text-2xl font-extrabold text-center mt-4 mb-6 text-purple-900 animate-pulse px-4">
            🎉 Tap the cake to celebrate! 🎉
          </h2>
          <img
            src={cake}
            alt="Birthday Cake"
            onClick={handleCakeClick}
            className="cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{ maxWidth: "1280px", width: "90%", height: "auto" }}
          />
        </>
      )}

      {showCard && (
        <div className="flex flex-col items-center text-center mt-8 px-4">
          <img
            src={dad}
            alt="Dad"
            className="w-56 sm:w-64 md:w-72 h-auto rounded-full object-cover border-4 border-pink-400 shadow-xl"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold mt-6 text-purple-800">
            Happy Birthday Daddy! 🎂
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-800 max-w-md leading-relaxed">
            Wishing you a day filled with love, laughter, and joy. I’m forever grateful for your love and support. ❤️
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
