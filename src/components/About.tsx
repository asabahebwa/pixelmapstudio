import { Link } from "react-router";
import "../styles/About.css";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-heading">Who we are</h1>
      <p className="first-paragraph">
        PixelMap is a digital creative studio where data visualization meets
        design to create impactful solutions. By combining technical expertise
        and creativity, you can turn complex data into interactive,
        user-friendly experiences.
      </p>
      <p className="second-paragraph">
        PixelMap is a freelancer practice created by{" "}
        <span className="founder">Livingstone Asabahebwa</span> in 2025. He
        specializes in transforming geographic data into interactive, visually
        compelling maps and data-driven visualizations.
      </p>
      <h1 className="about-heading">Our mission</h1>
      <p className="first-paragraph">
        Our services help organizations, researchers, and businesses explore,
        understand, and communicate complex spatial data, leading to actionable
        insights and better decision-making.
      </p>
      <h1 className="about-heading">What we offer</h1>
      <p className="first-paragraph">
        With expertise across the full spectrum of data visualization, PixelMap
        manages everything from data collection and processing to the creation
        of highly customized, interactive graphics. Whether it's creating
        dashbaords, geospatial analysis, or data-driven storytelling, we deliver
        solutions tailored to your specific needs.
      </p>
      <p className="second-paragraph">
        Using a cutting-edge tech stack — Mapbox, D3.js, Metabse, and
        JavaScript/TypeScript — we create custom mapping and interactive
        visualizations that work seamlessly on both desktop and mobile
        platforms. The projects focus on crafting intuitive user experiences and
        immersive visual environments, leveraging advanced geospatial tools to
        bring geographic data to life.
      </p>
      <h1 className="about-heading">How we work</h1>
      <p className="first-paragraph">
        At PixelMap, every project begins with a deep understanding of your
        data, goals, and audience. We take a collaborative, iterative
        approach—working closely with clients to define the problem, clarify the
        story, and design solutions that are both visually compelling and
        functionally effective. From initial research and data wrangling to
        prototyping and final deployment, we prioritize clarity, usability, and
        performance. Using agile workflows and modern development tools, we
        ensure that each visualization is not only accurate and engaging but
        also tailored to fit seamlessly within your digital ecosystem.
      </p>
      <h1 className="about-heading">Meet the founder</h1>
      <p className="founder">
        {" "}
        Livingstone Asabahebwa - Senior Frontend Engineer
      </p>
      <p className="first-paragraph">
        Livingstone Asabahebwa is a seasoned frontend engineer with 5+ years of
        experience building responsive web applications, specializing in web
        frontend development using React and JavaScript/TypeScript. Skilled in
        integrating data-vis and geospatial technologies into major frontend
        frameworks and libraries to create interactive visual stories.
      </p>
      <Link to="/contact" className="about-contact-button">
        Let's talk
      </Link>
    </div>
  );
}

export default About;
