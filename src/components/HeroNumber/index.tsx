import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { HeroNumber as HeroNumberData } from '@components/Panels/types';
import { useAnimations } from '@context/AnimationContext';
import styles from './hero-number.module.scss';

const SEGMENTS = 20;

function formatValue(value: number, format: HeroNumberData['format'] = 'plain') {
  if (format === 'compact')
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
      value,
    );
  if (format === 'percent') return `${value.toFixed(2)}%`;
  return Math.round(value).toLocaleString('en');
}

/** One headline figure: counts up when it scrolls into view, with an optional segmented meter. */
const HeroNumber = ({ value, label, format, suffix, meter, unverified }: HeroNumberData) => {
  const { TRANSITIONS } = useAnimations();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduceMotion) return setShown(value);
    if (!inView) return;
    const { duration } = TRANSITIONS.HERO.COUNT;
    const controls = animate(0, value, { duration, ease: 'easeOut', onUpdate: setShown });
    return () => controls.stop();
  }, [inView, reduceMotion, value, TRANSITIONS]);

  const lit = meter === undefined ? 0 : Math.round(meter * SEGMENTS);

  return (
    <div ref={ref} className={styles.hero}>
      <div className={styles.value}>
        {/* Screen readers get the final figure, not the count. */}
        <span aria-hidden>{formatValue(shown, format)}</span>
        <span className={styles.srOnly}>{formatValue(value, format)}</span>
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      <div className={styles.label}>
        {label}
        {unverified && (
          <span className={styles.unverified} title="An estimate, not yet confirmed">
            unverified
          </span>
        )}
      </div>
      {meter !== undefined && (
        <motion.div
          className={styles.meter}
          aria-hidden
          initial="off"
          animate={inView ? 'on' : 'off'}
          transition={{ staggerChildren: TRANSITIONS.HERO.SEGMENT_STAGGER.staggerChildren }}
        >
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <motion.span
              key={i}
              className={styles.segment}
              variants={{ off: { opacity: 0.15 }, on: { opacity: i < lit ? 1 : 0.15 } }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HeroNumber;
