import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  border-bottom: 1px solid ${palette('grayscale', 8)};

  &:hover,
  &.selected {
    background-color: ${palette('grayscale', 8)};
  }

  &.type-success .icon {
    color: ${palette('success', 0)};
  }

  &.type-warning .icon {
    color: ${palette('warning', 0)};
  }

  &.type-error .icon {
    color: ${palette('error', 0)};
  }

  &.type-info .icon {
    color: ${palette('info', 0)};
  }

  .icon {
    font-size: 42px;
    line-height: 1;
    flex: 0 0 57px;
  }

  .content {
    flex: 1 1 0;
    overflow-x: hidden;
  }

  .message {
    height: 4.5em;
    overflow: hidden;
  }

  .date {
    float: right;
    font-size: 0.85em;
    margin: 2px 0 0 5px;
  }
`

export default StyleWrapper
