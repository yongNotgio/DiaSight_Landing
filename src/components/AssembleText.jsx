import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-driven letter assembly (adapted from Skiper UI — skiper31, by
 * @gurvinder-singh02). Characters start spread out from the center and
 * converge into place as the element scrolls toward the viewport middle.
 * Words stay intact so the line wraps normally on small screens.
 */
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const Char = ({ char, distance, progress }) => {
  const x = useTransform(progress, [0, 1], [distance * 14, 0])
  const rotateX = useTransform(progress, [0, 1], [clamp(distance * 6, -80, 80), 0])
  const opacity = useTransform(progress, [0, 0.6, 1], [0.15, 0.7, 1])

  return (
    <motion.span className="inline-block will-change-transform" style={{ x, rotateX, opacity }}>
      {char}
    </motion.span>
  )
}

const AssembleText = ({ text, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.45'],
  })

  const words = text.split(' ')
  const centerIndex = (text.length - 1) / 2
  let charIndex = 0

  return (
    <span ref={ref} className={`inline-block [perspective:600px] ${className ?? ''}`}>
      {words.map((word, w) => {
        const start = charIndex
        charIndex += word.length + 1
        return (
          <span key={w} className="inline-block whitespace-nowrap">
            {word.split('').map((char, c) => (
              <Char
                key={c}
                char={char}
                distance={start + c - centerIndex}
                progress={scrollYProgress}
              />
            ))}
            {w < words.length - 1 && <span className="inline-block w-[0.28em]" />}
          </span>
        )
      })}
    </span>
  )
}

export default AssembleText
