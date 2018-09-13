import styled from 'styled-components'


const StyleWrapper = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;

  .logoWrapper {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .menu {
    flex: 1 1 0;
    background: rgba(255, 255, 255, 0.05);
  }
`

export default StyleWrapper
