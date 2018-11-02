import styled from 'styled-components'


const StyleWrapper = styled.div`
  max-width: 800px;
  margin: auto;

  .wizardStep {    
    border: 1px solid #ebedf0;
    border-radius: 2px;
    padding: 40px 25px;
  }

  .wizardButtons {
    text-align: right;
    margin-top: 25px;

    button {
      margin-left: 10px;
    }
  }
`

export default StyleWrapper
