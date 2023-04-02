import { Variants } from 'framer-motion';
import theme from '../../theme';

export const searchAnimationVariants: Variants = {
  hidden: {
    x: theme.spacing(-44),
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
    },
  },
};

export const createAnimationVariants: Variants = {
  hidden: {
    x: theme.spacing(44),
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
    },
  },
};

export const listAnimationVariants: Variants = {
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
