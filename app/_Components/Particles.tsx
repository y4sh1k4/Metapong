"use client"
import React, { useCallback } from "react";
import type { Engine, Container, ISourceOptions } from "tsparticles-engine";
import { Particles as ReactParticles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const particlesOptions: ISourceOptions = {
  background: {
    color: {
      value: "#070f2b",
    },
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 98,
      density: {
        enable: true,
        value_area: 1039.584166333467
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 2,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 0.5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 26.728655548625916,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0,
      "width": 0
    },
    "move": {
      "enable": true,
      "speed": 4.798080767692925,
      "direction": "right",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  detectRetina: true,
};

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <ReactParticles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticlesBackground;