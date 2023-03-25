import React, { useState, useEffect } from "react";
import "./FullScroll.css";
import gxtLogo from "./assets/gtx-logo.svg";

function FullScroll(props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = React.Children.toArray(props.children);
  const SCROLL_THRESHOLD = 50;

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = (event) => {
      const delta = Math.sign(event.deltaY);

      if (!isScrolling && Math.abs(event.deltaY) > SCROLL_THRESHOLD) {
        isScrolling = true;
        setCurrentPageIndex((prevPageIndex) =>
          delta > 0
            ? Math.min(prevPageIndex + 1, pages.length - 1)
            : Math.max(prevPageIndex - 1, 0)
        );

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      } else {
        event.preventDefault();
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
    <div className="full-scroll-container">
      <img src={gxtLogo} alt="GrowtX" className="logo" />
      <div className="full-scroll-content" style={containerStyle}>
        {pages.map((page, index) => (
          <div key={index} className="full-scroll-page">
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullScroll;
