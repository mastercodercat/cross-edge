import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  border: 1px solid ${palette('grayscale', 8)};
  visibility: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  &.visible {
    visibility: visible;
  }

  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .header {
    flex: 0 0 auto;
    border-bottom: 1px solid ${palette('grayscale', 8)};
  }

  .contentBox {
    display: flex;
    flex: 1 1 0;
    flex-direction: row;
  }

  .sideArea,
  .contentArea {
    transition: transform 0.3s;
  }

  .sideArea {
    flex: 0 0 300px;
    border-right: 1px solid ${palette('grayscale', 8)};
    overflow-y: auto;
  }

  .contentArea {
    flex: 1 1 0;
    position: relative;
  }

  .contentAreaInner {
    padding: 20px;
  }

  .unselectedNotice {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 24px;
    opacity: 0.4;
  }

  .backLink {
    display: none;
  }

  @media screen and (max-width: 767px) {
    .contentBox {
      position: relative;
      display: block;
    }

    .sideArea,
    .contentArea {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .contentArea {
      transform: translateX(100%);
    }

    .backLink {
      display: block;
      margin-bottom: 10px;
    }

    &.contentOpen {
      .sideArea {
        transform: translateX(-100%);
      }

      .contentArea {
        transform: translateX(0);
      }
    }
  }
`

export default StyleWrapper
