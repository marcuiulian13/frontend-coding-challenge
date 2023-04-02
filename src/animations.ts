import theme from './theme';

export const headerAnimationVariants = {
  hidden: {
    y: theme.spacing(-4),
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.5,
    },
  },
};
