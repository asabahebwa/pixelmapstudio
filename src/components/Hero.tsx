import "../styles/Hero.css";
import Type from "./Type";

function Hero() {
  return (
    <div className="hero-wrapper">
      <div className="hero-content">
        <div className="hero-message--constant">Data can be</div>
        <div className="hero-message--with-type">
          <Type />
        </div>
      </div>
      <div className="hero-bottom-image"></div>
    </div>
  );
}

export default Hero;
