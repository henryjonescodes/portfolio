import React from "react"
import { motion } from "framer-motion"

// Word wrapper
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span className="word-wrapper">{children}</span>
}

// Map API "type" vaules to JSX tag names
const tagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
}

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
const AnimatedText = ({ text, type }: { text: string; type: string }) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
      color: "#0055FF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: "#FF0088",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  }

  //  Split each word of props.text into an array
  const splitWords = text.split(" ")

  // Create storage array
  const words: string[][] = []

  // Push each word into words array
  splitWords.forEach((item) => {
    words.push(item.split(""))
  })

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0")
  })

  // Get the tag name from tagMap
  // @ts-ignore
  const Tag = tagMap[type]

  return (
    <Tag>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element, index) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              )
            })}
          </Wrapper>
        )
      })}
      {/* {} */}
    </Tag>
  )
}

export default AnimatedText
