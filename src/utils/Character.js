import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';
import styles from './style.module.scss';

export default function Character({paragraph}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.3"]
  })

  const words = paragraph.split(" ")
  return (
    <p 
      ref={container}         
      className={styles.paragraph}
    >
      <span className="absolute block top-0 left-6p transform  text-white text-opacity-50 font-bold text-xl md:text-2xl lg:text-3xl">
      &lt;p&gt;
    </span>
    {
      words.map( (word, i) => {
        const start = i / words.length
        const end = start + (1 / words.length)
        return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
      })
    }
     <span className="absolute block [bottom:-6px] left-6p  transform text-white text-opacity-50 font-bold text-xl md:text-2xl lg:text-3xl">
      &lt;/p&gt;
    </span>
    </p>
  )
}

const Word = ({children, progress, range}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className={styles.word}>
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

const Char = ({children, progress, range}) => {
  const opacity = useTransform(progress, range, [0,1])
  return (
    <span>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{opacity: opacity}}>{children}</motion.span>
    </span>
  )
}