import styled from 'styled-components'

import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  .topbar {
    background-color: ${palette('adeptLochmara5', 0)};
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    padding: 0;
    height: 70px;
  }

  .logoWrapper {
    height: 100%;
    width: 240px;
    display: flex;
    align-items: center;
  }

  .siderTriggerBtn {
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 28px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    display: block;
  }

  .contentWrapper {
    margin: 20px;
    padding: 30px;
    background-color: #fff;
  }
`

export default StyleWrapper
