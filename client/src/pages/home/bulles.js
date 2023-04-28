import * as React from "react";
import classnames from "classnames";
import Image from "react-bootstrap/Image";

const Bulles = ({ image, text, name, content }) => {
  const [mouseOver, setMouseOver] = React.useState(false);
  const [mouseLeave, setMouseLeave] = React.useState(false);

  const onMouseEnter = () => {
    setMouseOver(true);
    setMouseLeave(false);
  };
  const onMouseLeave = () => {
    setMouseOver(false);
    setMouseLeave(true);
  };

  const classes = classnames("bulle", `bulle--${name}`, "rounded-circle");
  const classesAnimated = classnames(
    "bulle__animation",
    `bulle__animation--${name}`,
    "rounded-circle",
    {
      "bulle__animation--mouse-over": mouseOver,
      "bulle__animation--mouse-leave": mouseLeave,
    }
  );

  return (
    <div className={classes}>
      <div
        className={classesAnimated}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="bulle__shape">
          <div className="bulle__shape2">
            <div className="bulle__shape3">
              <div className="bulle__shape4">
                <div className="bulle__shape5">
                  <Image className="bulle__image" fluid src={image}></Image>
                </div>
                  <h5 className="bulle__title">{text}</h5>
              </div>
              <p className="bulle__content">{content}</p>
            </div>
            {/* <p>{content}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bulles;
