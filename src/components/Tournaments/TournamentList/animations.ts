import { Variants } from 'framer-motion';
import theme from '../../../theme';

export const loadingAnimationVariants: Variants = {
  visible: {
    opacity: [0, 1],
    scale: [1.0, 1.1],
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 0.8,
    },
  },
};

export const noResultsAnimationVariants: Variants = {
  visible: {
    opacity: 1,
    rotate: [0, -4, 4, -4, 4, 0],
    transition: {
      duration: 0.5,
    },
  },
};

export const errorAnimationVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.2,
    },
  },
};

export const itemAnimationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: theme.spacing(4),
  },
  visible: ({ i, total }: { i: number; total: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      // Items start fading in from the start and the end of the list at the same time.
      delay: Math.min(i * 0.05 + 0.3, (total - i) * 0.05 + 0.3),
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
