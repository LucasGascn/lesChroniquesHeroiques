import background from "./assets/images/landscape.jpg";
import useParallax from "./hooks/use-parallax.js";


const Background = () => {
        useParallax(10);
    return <div className="background">
        <img className="background__image parallax" src={background} alt=""></img>
    </div>
}
export default Background;