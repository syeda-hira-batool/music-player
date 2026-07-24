import { useEffect, useRef } from "react";

export default function PixelDust() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let particles = [];
        let mouse = {
            x: 0,
            y: 0
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;

            // Create pixel dust
            for (let i = 0; i < 7; i++) {
                particles.push({
                    x: mouse.x,
                    y: mouse.y,
                    size: Math.random() * 4 + 1,
                    opacity: 1,
                    velocityX: (Math.random() - 0.5) * 2,
                    velocityY: (Math.random() - 0.5) * 2
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
                particle.opacity -= 0.02;

                ctx.fillStyle = `rgba(255, 230, 212, ${particle.opacity})`;

                ctx.fillRect(
                    particle.x,
                    particle.y,
                    particle.size,
                    particle.size
                );
            });

            particles = particles.filter(
                (particle) => particle.opacity > 0
            );

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="
                fixed
                inset-0
                pointer-events-none
                z-50
            "
        />
    );
}