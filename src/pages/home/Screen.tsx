import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Vector3 } from "@react-three/fiber";
import styles from "./home.module.scss";
import cn from "classnames";

type OverlayProps = {
  position?: Vector3;
};

type LineData = {
  text: string;
  wrapper: keyof JSX.IntrinsicElements; // Ensure wrapper is one of the valid HTML elements
};

// Define the array of objects with the correct types for wrapper
const textLines: LineData[] = [
  { text: "Henry Jones", wrapper: "h1" },
  { text: "About", wrapper: "h2" },
  { text: "Projects", wrapper: "h2" },
  { text: "Experience", wrapper: "h2" },
];

const staggeredChar = (lineIndex: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (charIndex: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: lineIndex * 0.5 + charIndex * 0.05, // Stagger delay for each character based on line and char index
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
  wrapper: keyof JSX.IntrinsicElements; // Typing for valid HTML elements (h1, h2, etc.)
  children: React.ReactNode;
  rest?: React.HTMLAttributes<HTMLElement>; // Type for valid HTML attributes
}) => {
  const Tag = wrapper;
  return <Tag {...rest}>{children}</Tag>; // Dynamically render the correct tag
};

export default function Screen({ position = [0, 0, 0.227] }: OverlayProps) {
  return (
    <Html position={position} scale={0.1} transform>
      <motion.div
        className={styles.screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div className={cn(styles.backdrop)} />
        <motion.div className={cn(styles.scanlines)} />
        <motion.div className={cn(styles.body)}>
          {textLines.map((line, i) => (
            <DynamicWrapper key={i} wrapper={line.wrapper}>
              {line.text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={staggeredChar(i)}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  {char}
                </motion.span>
              ))}
            </DynamicWrapper>
          ))}
        </motion.div>
        {/* <video src="landing-01.mp4" autoPlay loop muted /> */}
      </motion.div>
    </Html>
  );
}
