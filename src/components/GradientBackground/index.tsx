import styles from "./gradient-background.module.scss";

const GradientBackground = () => {
  return (
    <div className={styles.background}>
      <div className={styles.gradient} />;
    </div>
  );
};

export default GradientBackground;
