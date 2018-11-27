import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  margin-bottom: 30px;
  border: 1px solid ${palette('grayscale', 8)};
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 1px 2px 1px rgba(0,0,0,0.08);
  }

  .imageWrapper {
    position: relative;
    padding-top: 35%;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
  }

  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .content {
    padding: 15px;
  }

  .title {
    margin-bottom: 7px;
  }

  .descriptionWrapper {
    min-height: 42px;
    overflow: hidden;
  }

  .buttonsWrapper {
    padding: 10px 10px 0;
    background-color: ${palette('grayscale', 9)};
    border-top: 1px solid ${palette('grayscale', 8)};

    .buttonCol {
      margin-bottom: 10px;
    }

    button {
      padding: 0;
    }
  }

  &.flexMode {
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;

    .content {
      flex: 1 1 auto;
    }
  }
`

export default StyleWrapper
