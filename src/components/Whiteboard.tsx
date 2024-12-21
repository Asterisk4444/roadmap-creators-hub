import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Paintbrush, X } from "lucide-react";

interface WhiteboardProps {
  onClose: () => void;
}

export function Whiteboard({ onClose }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = 2;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!contextRef.current) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;

    contextRef.current.closePath();
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = isEraser ? "#ffffff" : color;
    contextRef.current.lineWidth = isEraser ? 20 : 2;
  }, [color, isEraser]);

  return (
    <div className="whiteboard">
      <div className="whiteboard-toolbar">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded"
        />
        <Button
          variant={isEraser ? "secondary" : "outline"}
          size="icon"
          onClick={() => setIsEraser(!isEraser)}
        >
          {isEraser ? <Eraser className="h-4 w-4" /> : <Paintbrush className="h-4 w-4" />}
        </Button>
        <Button variant="destructive" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="cursor-crosshair"
      />
    </div>
  );
}