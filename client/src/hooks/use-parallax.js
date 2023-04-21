import * as React from "react";

const useParallax = (speed) => {
  const parallax = React.useRef();
  React.useEffect(() => {
    parallax.current = document.querySelector(".parallax");
    parallax.current.style.height = `${100 + speed}%`;
    parallax.current.style.top = `-${speed}%`;

    window.addEventListener("scroll", () => {
      const { body, documentElement } = document;
      const { scrollTop: bodyScroll, scrollHeight: bodyHeight } = body;
      const { scrollTop: documentScroll, scrollHeight: documentHeight } =
        documentElement;

      const scroll = bodyScroll | documentScroll;
      const height = bodyHeight | documentHeight;

      const top = (scroll / (height - documentElement.clientHeight)) * speed; 

      parallax.current.style.top = `-${speed - top}%`;
    });
  }, []);
};

export default useParallax;
