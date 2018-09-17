import styled from 'styled-components'

import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  .topbar {
    background-color: ${palette('adeptBlue', 0)};
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    padding: 0;
  }

  .logoWrapper {
    height: 100%;
    width: 240px;
    display: flex;
    align-items: center;
  }

  .contentWrapper {
    margin: 20px;
    padding: 20px 20px 30px;
    background-color: #fff;
  }
`

export default StyleWrapper
