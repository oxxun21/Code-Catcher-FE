import { useState } from "react";

interface DraggableProps {
  initialWidth: number;
  initialHeight: number;
}

export const useDraggable = ({ initialWidth, initialHeight }: DraggableProps) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const minWidth = 30;
  const maxWidth = 70;
  const minHeight = 30;
  const maxHeight = 70;

  const startDragHorizontal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const onDrag = (e: MouseEvent) => {
      const deltaWidth = ((e.clientX - startX) / window.innerWidth) * 100;
      const newWidth = Math.min(Math.max(startWidth + deltaWidth, minWidth), maxWidth);
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
    const startY = e.clientY;
    const startHeight = height;

    const onDrag = (e: MouseEvent) => {
      const deltaHeight = ((e.clientY - startY) / window.innerHeight) * 100;
      const newHeight = Math.min(Math.max(startHeight + deltaHeight, minHeight), maxHeight);
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
