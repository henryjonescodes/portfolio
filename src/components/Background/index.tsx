import { motion } from "framer-motion";
import styles from "./background.module.scss";
import cn from "classnames";

const Background = () => {
  return (
    <>
      <motion.div className={cn(styles.backdrop)} />
      <motion.div className={cn(styles.scanlines)} />
    </>
  );
};

export default Background;
