import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  border: 1px solid ${palette('grayscale', 8)};
  display: flex;
  visibility: hidden;

  &.visible {
    visibility: visible;
  }

  .side {
    flex: 0 0 300px;
    border-right: 1px solid ${palette('grayscale', 8)};
  }

  .content {
    flex: 1 1 0;
  }
`

export default StyleWrapper
