import Styles from "./about.module.css";
import InfoPanel from "./info-panel/InfoPanel";

const About = () => {
  return (
    <div className={Styles.about}>
      <InfoPanel />
      <InfoPanel />
    </div>
  );
};

export default About;
