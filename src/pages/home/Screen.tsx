import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";
import cn from "classnames";
import { useParams, useNavigate } from "react-router-dom";

type OverlayProps = {
  position?: Vector3;
};

type LineData = {
  text: string;
  wrapper: keyof JSX.IntrinsicElements; // Ensure wrapper is one of the valid HTML elements
  page: string | null;
};

// Define the array of objects with the correct types for wrapper
const textLines: LineData[] = [
  { text: "Henry Jones", wrapper: "h1", page: null },
  { text: "Creative Developer", wrapper: "h3", page: null },
  { text: "About", wrapper: "h2", page: "about" },
  { text: "Projects", wrapper: "h2", page: "projects" },
  { text: "Experience", wrapper: "h2", page: "experience" },
];

// Animation variants for individual characters (typing effect in/out)
const staggeredChar = (lineIndex: number) => ({
  hidden: { opacity: 0, y: 20 }, // Characters come from below
  visible: ([charIndex, charCount]: [number, number]) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: lineIndex * 0.5 + charIndex * 0.05, // Stagger appearance
      duration: 0.2,
    },
  }),
  exit: ([charIndex, charCount]: [number, number]) => ({
    opacity: 0,
    y: 0,
    transition: {
      delay: (charCount - charIndex) * 0.05,
      duration: 0.2,
    },
  }),
});

// Define the variants for the animation
const pageContentVariants = {
  initial: { opacity: 0, y: 20 }, // Initial hidden state
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 1, // Delay only for animate state
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3, // No delay for exit
    },
  },
};

// Improved typing for DynamicWrapper, ensuring valid HTML tags are used
const DynamicWrapper = ({
  wrapper,
  children,
  ...rest
}: {
  wrapper: keyof JSX.IntrinsicElements; // Dynamic HTML tag (h1, h2, etc.)
  onClick?: () => void; // Optional click handler
} & React.PropsWithChildren) => {
  const Tag = wrapper;
  // @ts-ignore
  return <Tag {...rest}>{children}</Tag>; // Render the correct tag dynamically
};

const Background = () => {
  return (
    <>
      <motion.div className={cn(styles.backdrop)} />
      <motion.div className={cn(styles.scanlines)} />
    </>
  );
};

type PageProps = {
  page: string | undefined;
  navigate: (path: string) => void;
};

const Home = ({ page, navigate }: PageProps) => {
  return (
    <AnimatePresence>
      {!page && (
        <motion.div className={styles.home}>
          {textLines.map(({ wrapper, text, page: textPage }, i) => (
            <DynamicWrapper
              key={i}
              wrapper={wrapper}
              onClick={() => {
                if (textPage) {
                  navigate(`/${textPage}`);
                }
              }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={staggeredChar(i)}
                  custom={[index, text.length]}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {char}
                </motion.span>
              ))}
            </DynamicWrapper>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Content = ({ page, navigate }: PageProps) => {
  return (
    <AnimatePresence>
      {page && (
        <motion.div
          className={styles.content}
          key="pageContent"
          variants={pageContentVariants} // Use variants for animation
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <h2
            onClick={() => {
              navigate(`/`);
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </h2>
          <p>This is the {page} page content.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Screen = ({ position = [0, 0, 0.227] }: OverlayProps) => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Background />
        <motion.div className={cn(styles.body)}>
          <Home page={page} navigate={navigate} />
          <Content page={page} navigate={navigate} />
        </motion.div>
      </motion.div>
    </Html>
  );
};

export default Screen;
