import { AnimatePresence, motion } from "framer-motion";
import styles from "./components.module.scss";
import { PageProps } from "./types";

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

const Menu = ({ page, navigate }: PageProps) => {
  return (
    <AnimatePresence>
      {!page && (
        <motion.div className={styles.menu}>
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

export default Menu;
