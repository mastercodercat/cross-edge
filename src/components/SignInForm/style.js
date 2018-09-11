import styled from 'styled-components';
import { palette } from 'styled-theme';


const styleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  .adpInputWrapper {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }

    input {
      &::-webkit-input-placeholder {
        color: ${palette('grayscale', 0)};
      }

      &:-moz-placeholder {
        color: ${palette('grayscale', 0)};
      }

      &::-moz-placeholder {
        color: ${palette('grayscale', 0)};
      }
      &:-ms-input-placeholder {
        color: ${palette('grayscale', 0)};
      }
    }

    button {
      font-weight: 500;
    }
  }
`

export default styleWrapper
