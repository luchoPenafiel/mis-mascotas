import styled from 'styled-components';
import theme from '../../../constants/theme';

const ParagraphMD = styled.p`
  margin: 10px 0;

  color: ${theme.color.fonts};
  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphMD};
  line-height: 1;
`;

export { ParagraphMD };