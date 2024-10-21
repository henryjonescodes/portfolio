import { motion } from "framer-motion";

// Define the staggered character typing effect
const staggeredChar = (lineIndex: number, delay: number) => ({
  hidden: { opacity: 0, y: 20 }, // Characters come from below
  visible: ([charIndex, charCount]: [number, number]) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay + lineIndex * 0.5 + charIndex * 0.008, // Adjust for line delay and stagger
      duration: 0.2,
    },
  }),
  exit: ([charIndex, charCount]: [number, number]) => ({
    opacity: 0,
    y: 0,
    transition: {
      delay: delay + (charCount - charIndex) * 0.008,
      duration: 0.2,
    },
  }),
});

// Component to animate text with staggered characters
const TypewriterText = ({
  text,
  lineIndex = 0,
  delay = 0, // Add a delay prop
}: {
  text: string;
  lineIndex?: number;
  delay?: number;
}) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={staggeredChar(lineIndex, delay)}
          custom={[index, text.length]}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};

export default TypewriterText;
