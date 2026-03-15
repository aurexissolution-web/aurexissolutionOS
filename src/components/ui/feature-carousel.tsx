"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import clsx from "clsx"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
} from "motion/react"
import Balancer from "react-wrap-balancer"

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

export interface ComponentProps extends CardProps {
  steps: readonly Step[]
}

export interface Step {
  id: string
  name: string
  title: string
  description: string
  content?: string
}

const TOTAL_STEPS = 4

function useNumberCycler(
  totalSteps: number = TOTAL_STEPS,
  interval: number = 4000
) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const setupTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)
  }, [interval, totalSteps])

  const increment = useCallback(() => {
    setCurrentNumber((prev) => (prev + 1) % totalSteps)
    setupTimer()
  }, [totalSteps, setupTimer])

  useEffect(() => {
    setupTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [currentNumber, setupTimer])

  return { currentNumber, increment }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    queueMicrotask(() => setIsMobile(isSmall))
  }, [])
  return isMobile
}

function FeatureCard({
  bgClass,
  step,
  steps,
}: CardProps & { step: number; steps: readonly Step[] }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` } as WrapperStyle}
    >
      <div className={clsx(
        "group relative w-full overflow-hidden rounded-3xl border transition duration-300",
        "border-white/5 bg-gradient-to-b from-[#0a0a0f] to-[#09090B]",
        "md:hover:border-[#00F0FF]/20",
        bgClass
      )}>
        {/* Glow effect that follows mouse */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(0, 240, 255, 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="m-8 md:m-12 min-h-[300px] md:min-h-[350px] w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full md:w-3/4 lg:w-2/3 flex-col gap-4 text-center mx-auto items-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Step indicator tag */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-[#00F0FF]/80 tracking-widest uppercase bg-[#00F0FF]/10 px-3 py-1 rounded-full">{steps[step].name}</span>
              </div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                {steps[step].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <p className="text-lg md:text-xl leading-relaxed text-[#94A3B8]">
                  <Balancer>{steps[step].description}</Balancer>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export const Component = ({
  steps,
  ...props
}: ComponentProps) => {
  const { currentNumber: step } = useNumberCycler()

  return (
    <FeatureCard {...props} step={step} steps={steps} />
  )
}

Component.displayName = "Component"
