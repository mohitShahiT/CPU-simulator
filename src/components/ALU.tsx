import { useEffect, useRef } from "react";

const draw = function (
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    // Draw a trapezoid shape for ALU
    context.beginPath();
    context.moveTo(0, 0); // Top-left corner
    context.lineTo(canvas.width, 0); // Top-right corner
    context.lineTo(canvas.width*(2/3), canvas.height); // Bottom-right corner
    context.lineTo(canvas.width / 3, canvas.height); // Bottom-left corner
    context.closePath();
    // Fill the shape with color
    context.fillStyle = "#808080";
    context.fill();
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    context.stroke();

    //ALU text
    context.fillStyle = '#000000';
    context.font = `${canvas.height * 0.2}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('ALU', canvas.width / 2, canvas.height / 2);
  };
const ALU: React.FC = function () {
const canvasRef = useRef<HTMLCanvasElement | null>(null);
useEffect(function () {
    const canvas = canvasRef.current;

    if (canvas) {
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (context) {
        draw(context, canvas);
    }
    }
}, []);
return (
    <div className="p-2 w-fit">
    <canvas ref={canvasRef} height={150} width={300}></canvas>
    </div>
);
};

export default ALU