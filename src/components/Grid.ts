import styled from 'styled-components';
import theme from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${theme.spacing(6)};

  margin-top: ${theme.spacing(4)};

  @media (min-width: ${theme.breakpoints.m}) {
    & {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default Grid;
