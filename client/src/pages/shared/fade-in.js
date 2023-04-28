import * as React from "react";
import classnames from "classnames";

const FadeIn = ({direction, children}) => {
  const [isVisible, setVisible] = React.useState(false);
  const elementRef = React.useRef();

  const classes = classnames('fade-in', `fade-in--${direction}`, {
      "fade-in--on" : isVisible,
  })

  React.useEffect(() => {
    const observer = new IntersectionObserver(enteries => {
      enteries.forEach(entery => {
        setVisible(entery.isIntersecting);
      });
    });
    observer.observe(elementRef.current);
  }, []);

  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  );
};
export default FadeIn;
