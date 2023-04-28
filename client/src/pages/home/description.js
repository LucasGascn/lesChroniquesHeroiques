import FadeIn from "../shared/fade-in";
import classnames from "classnames";

const Description = ({direction, content}) => {

    const classes = classnames("description", `description--${direction}`)
    
return <>
    <FadeIn direction={direction}>
        <p className={classes}>
            {content}
        </p>
    </FadeIn>
</>
}

export default Description;
