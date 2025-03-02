"use client"; // Ensures this runs on the client side

import { useEffect } from "react";

const AutoplayMusic: React.FC = () => {
  useEffect(() => {
    const audio = document.createElement("audio");
    audio.src = "/audio.mp3"; // Update with your audio file path
    audio.loop = true;
    audio.autoplay = true;

    // Attempt to play the audio
    const playAudio = () => {
      audio.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction.");
        document.addEventListener("click", playAudioOnce);
      });
    };

    // Play once user interacts
    const playAudioOnce = () => {
      audio.play();
      document.removeEventListener("click", playAudioOnce);
    };

    playAudio();

    return () => {
      document.removeEventListener("click", playAudioOnce);
      audio.pause();
    };
  }, []);

  return null; // No direct JSX output to avoid hydration errors
};

export default AutoplayMusic;
