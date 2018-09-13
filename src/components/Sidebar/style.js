import styled from 'styled-components'
import { palette } from 'styled-theme'


const StyleWrapper = styled.div`
  background: ${palette('secondary', 0)};
  border-bottom: 1px solid rgba(0,0,0,0.1);
  height: 100%;
  color: #fff;
  width: 240px;
  display: flex;
  flex-direction: column;

  .logoWrapper {
    height: 70px;
    background: ${palette('secondary', 0)};
    display: flex;
    align-items: center;
  }

  .menu {
    flex: 1 1 0;
    background: rgba(255, 255, 255, 0.05);
  }
`

export default StyleWrapper
