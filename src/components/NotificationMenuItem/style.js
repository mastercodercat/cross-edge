import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  border-bottom: 1px solid ${palette('grayscale', 8)};

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
    margin-bottom: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .date {
    font-size: 0.85em;
    margin-bottom: 3px;
  }
`

export default StyleWrapper
