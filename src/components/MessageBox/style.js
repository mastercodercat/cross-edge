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
    overflow-y: auto;
  }

  .content {
    flex: 1 1 0;
    position: relative;
  }

  .unselectedNotice {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 24px;
    opacity: 0.4;
  }
`

export default StyleWrapper
