import React, { useState, useEffect, useRef } from "react";
import "./FullScroll.css";
import gxtLogo from "./assets/gtx-logo.svg";

// For individual pages
const FullScrollPage = (props) => {
  const { logo, children } = props;
  return (
    <div className="full-scroll-page">
      <img src={logo} alt="GrowtX" className="logo" />
      <div className="full-scroll-page-content">{children}</div>
    </div>
  );
};

function FullScroll(props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = React.Children.toArray(props.children);
  const SCROLL_THRESHOLD = 50;
  const containerRef = useRef(null);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = (event) => {
      const delta = Math.sign(event.deltaY);

      // Check if the current page has reached the top or bottom
      const isAtTop = event.target.scrollTop === 0;
      const isAtBottom =
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight;

      if (!isScrolling && Math.abs(event.deltaY) > SCROLL_THRESHOLD) {
        if ((delta > 0 && !isAtBottom) || (delta < 0 && !isAtTop)) {
          // Prevent default scrolling behavior
          event.preventDefault();
          const container = event.target;
          const scrollY = container.scrollTop + event.deltaY;
          container.scrollTo({
            top: scrollY,
            behavior: "smooth",
          });
        } else {
          // Allow normal scrolling behavior
          isScrolling = true;
          setCurrentPageIndex((prevPageIndex) =>
            delta > 0
              ? Math.min(prevPageIndex + 1, pages.length - 1)
              : Math.max(prevPageIndex - 1, 0)
          );
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const containerStyle = {
    height: `${100 * pages.length}vh`,
    transform: `translateY(-${currentPageIndex * (100 / pages.length)}%)`,
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  };

  return (
    <div className="full-scroll-container" ref={containerRef}>
      <div className="full-scroll-content" style={containerStyle}>
        {pages.map((page, index) => (
          <FullScrollPage key={index} logo={gxtLogo}>
            {page}
          </FullScrollPage>
        ))}
      </div>
    </div>
  );
}

export default FullScroll;
