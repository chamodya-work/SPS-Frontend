// //code 1
// import { useEffect, useRef } from "react";

// const Snowfall = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     let width = window.innerWidth;
//     let height = window.innerHeight;

//     canvas.width = width;
//     canvas.height = height;

//     const snowflakes = [];
//     const SNOW_COUNT = width < 768 ? 120 : 220;

//     class Snowflake {
//       constructor() {
//         this.reset();
//       }

//       reset() {
//         this.x = Math.random() * width;
//         this.y = Math.random() * height;
//         this.radius = Math.random() * 3 + 1;
//         this.speed = Math.random() * 1.2 + 0.3;
//         this.wind = Math.random() * 0.6 - 0.3;
//         this.opacity = Math.random() * 0.5 + 0.3;
//       }

//       update() {
//         this.y += this.speed;
//         this.x += Math.sin(this.y * 0.01) + this.wind;

//         if (this.y > height) {
//           this.y = -10;
//           this.x = Math.random() * width;
//         }
//       }

//       draw() {
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
//         ctx.fill();
//       }
//     }

//     for (let i = 0; i < SNOW_COUNT; i++) {
//       snowflakes.push(new Snowflake());
//     }

//     const animate = () => {
//       ctx.clearRect(0, 0, width, height);
//       snowflakes.forEach((flake) => {
//         flake.update();
//         flake.draw();
//       });
//       requestAnimationFrame(animate);
//     };

//     animate();

//     const resize = () => {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       canvas.width = width;
//       canvas.height = height;
//     };

//     window.addEventListener("resize", resize);

//     return () => window.removeEventListener("resize", resize);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         pointerEvents: "none",
//         zIndex: 9999,
//       }}
//     />
//   );
// };

// export default Snowfall;

//final version
import { useEffect, useRef } from "react";

const Snowfall = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const MAX_FLAKES = width < 768 ? 60 : 120;
    const flakes = [];

    class Snowflake {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -10;
        this.size = Math.random() * 2 + 1;
        this.speed = this.size * 0.6;
        this.drift = Math.random() * 0.6 - 0.3;
      }

      update() {
        this.y += this.speed;
        this.x += this.drift;

        if (this.y > height) {
          this.reset();
        }

        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }
    }

    for (let i = 0; i < MAX_FLAKES; i++) {
      flakes.push(new Snowflake());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        flakes[i].update();
        flakes[i].draw();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default Snowfall;
