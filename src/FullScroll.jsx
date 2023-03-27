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
  const { questions, answers, handleShowError } = props;

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pages = React.Children.toArray(props.children);
  const SCROLL_THRESHOLD = 30;
  const containerRef = useRef(null);

  const isQuestion = (pageIndex) => {
    if (pageIndex === 0) {
      return false;
    }
    return true;
  };

  const isRequiredQuestionAnswered = (pageIndex) => {
    if (
      questions[pageIndex - 1].isRequired === true &&
      answers[pageIndex - 1].value === null
    ) {
      return true;
    }
    return false;
  };

  const handleNextQuestion = (pageIndex) => {
    // dont scroll if required not filled
    if (isQuestion(pageIndex) && isRequiredQuestionAnswered(pageIndex)) {
      handleShowError(true);
      return pageIndex;
    }
    return Math.min(pageIndex + 1, pages.length - 1);
  };

  const handlePrevQuestion = (pageIndex) => {
    handleShowError(false);
    return Math.max(pageIndex - 1, 0);
  };

  const getNextIndex = (prevPageIndex, delta) => {
    return delta > 0
      ? handleNextQuestion(prevPageIndex)
      : handlePrevQuestion(prevPageIndex);
  };

  useEffect(() => {
    // for enter detect
    containerRef.current.focus();

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
            getNextIndex(prevPageIndex, delta)
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
    transform: `translateY(-${currentPageIndex * (100 / pages.length)}%)`,
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    scrollBehavior: "smooth",
  };

  const updateNextPage = ()=>{
    setCurrentPageIndex((prevPageIndex) => handleNextQuestion(prevPageIndex));
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateNextPage();
    }
  };

  //   const childrenWithProps = ()=> {return React.Children.map(props.children, (child) => {
  //     // Checking isValidElement is the safe way and avoids a
  //     // typescript error too.
  //     if (React.isValidElement(child)) {
  //       const clonedChild = React.cloneElement(child, {
  //         children: {
  //           ...child.props.children,
  //           handleNextQuestion
  //         }
  //       });

  //       // console.log(`Child props:`, child.props);
  //       // console.log(`Cloned child props: `, clonedChild.props);
  //       return clonedChild;
  //     }
  //     return child;
  //   });
  // }

  // const pages1 = React.Children.toArray(childrenw);

  function addPropsToReactElement(element) {
    if (React.isValidElement(element)) {
      // console.log(element.props.children)
      // console.log(element.props.children.props)
      if (JSON.stringify(element.props.children.props) === "{}") {
        let clonedChild = React.cloneElement(element, {
          updateNextPage,
        });
        return clonedChild;
      }
      let clonedChildP = React.cloneElement(element, {
        ...element.props,
        children: {
          ...element.props.children,
          props: {
            ...element.props.children.props,
            updateNextPage,
          },
        },
      });
      return clonedChildP;
    }
    return element;
  }

  function addPropsToChildren(children) {
    if (!Array.isArray(children)) {
      return addPropsToReactElement(children);
    }
    return children.map((childElement) =>
      addPropsToReactElement(childElement)
    );
  }

  return (
    <div
      className="full-scroll-container"
      ref={containerRef}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      <div className="full-scroll-content" style={containerStyle}>
        {pages.map((page, index) => (
          <FullScrollPage key={index} logo={gxtLogo}>
            {addPropsToChildren(page)}
          </FullScrollPage>
        ))}
      </div>
    </div>
  );
}

export default FullScroll;
