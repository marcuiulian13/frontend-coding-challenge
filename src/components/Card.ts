import styled from 'styled-components';
import theme from '../theme';

const Card = styled.div`
  padding: ${theme.spacing(4)};
  background: ${theme.palette.background.base};

  border-radius: ${theme.borderRadius};
`;

export default Card;
