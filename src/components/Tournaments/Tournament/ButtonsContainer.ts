import styled from 'styled-components';
import theme from '../../../theme';

const ButtonsContainer = styled.div`
  flex: 1;

  display: flex;
  align-items: flex-end;

  margin-top: ${theme.spacing(2)};
  gap: ${theme.spacing(2)};
`;

export default ButtonsContainer;
