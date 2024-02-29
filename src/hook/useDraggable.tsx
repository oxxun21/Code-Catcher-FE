import { useState } from "react";

interface DraggableProps {
  initialWidth: number;
  initialHeight: number;
}

const useDraggable = ({ initialWidth, initialHeight }: DraggableProps) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const startDragHorizontal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const onDrag = (e: MouseEvent) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setWidth(newWidth);
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  const startDragVertical = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const onDrag = (e: MouseEvent) => {
      const newHeight = (e.clientY / window.innerHeight) * 100;
      setHeight(newHeight);
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  return { width, height, startDragHorizontal, startDragVertical };
};

export default useDraggable;
