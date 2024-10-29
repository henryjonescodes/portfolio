import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Background from "../../components/Background";
import { CustomHTML } from "../../components/CustomHTML";
import Page from "../../components/Page";
import { screenSize } from "../../styles/constants";
import Menu from "../home/Menu";
import styles from "./landing.module.scss";

type ScreenProps = {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Screen = ({ fullScreen, setFullScreen }: ScreenProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const page = pathSegments[0];

  const navigate = useNavigate(); // Initialize the navigate function
  const { width, height } = screenSize;

  const isHidden = (fullScreen && page !== undefined) || page === undefined;

  const wrapperVariants = {
    show: {
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 1,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <CustomHTML transform>
      <motion.div
        className={styles.screen}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Background />
        <Menu />
        <motion.div
          className={cn(styles.wrapper, {
            [styles.disabled]: isHidden,
          })}
          variants={wrapperVariants}
          initial="hide"
          animate={isHidden ? "hide" : "show"}
        >
          <AnimatePresence>
            {!fullScreen && (
              <Page
                key={"screen"}
                navigate={navigate}
                fullScreen={fullScreen}
                setFullScreen={setFullScreen}
                visible={page !== undefined}
                page={page}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </CustomHTML>
  );
};

export default Screen;
