import { useEffect, useState } from "react";

// Custom cursor component that follows the user's mouse and only appears when the mouse is inside the document window
export function CustomCursor() {
  // State to track the current mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // State to track whether the cursor should be visible (i.e., mouse is inside the window)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Handler to update mouse position state on mouse move
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handler to show the custom cursor when mouse enters the window
    const handleMouseEnter = () => setIsVisible(true);
    // Handler to hide the custom cursor when mouse leaves the window
    const handleMouseLeave = () => setIsVisible(false);

    // Add event listeners for mouse movement and window enter/leave
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // If the cursor is not visible (mouse is outside the window), render nothing
  if (!isVisible) return null;

  // Render two divs for the custom cursor: a dot and an outline, both positioned at the mouse coordinates
  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
    </>
  );
}