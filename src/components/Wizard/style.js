import styled from 'styled-components'


const StyleWrapper = styled.div`
  .wizardStep {
    border: 1px solid #ebedf0;
    border-radius: 2px;
    padding: 40px 25px;
  }

  .wizardStepField {
    &:not(:last-child) {
      margin-bottom: 50px;
    }

    &:last-child {
      margin-bottom: 25px;
    }
  }

  .wizardAdditionalOption {
    margin-top: 25px;
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
