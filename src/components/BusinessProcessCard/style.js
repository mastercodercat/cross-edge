import styled from 'styled-components'


const StyleWrapper = styled.div`
  margin-bottom: 30px;

  .business-process-image-wrapper {
    position: relative;
    padding-top: 35%;
    border: 1px solid #c0c0c0;
  }

  .business-process-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .content {
    border-width: 0 1px 1px;
    border-style: solid;
    border-color: #e8e8e8;
    padding: 10px;
  }

  .title {
    margin-bottom: 20px;
  }

  .description {
    min-height: 6em;
    margin-bottom: 10px;
  }

  .buttons {
    display: flex;
    flex-wrap: nowrap;
    margin: 0 -5px;
  }

  .button-wrapper {
    flex: 1 1 0;
    margin: 0 5px;
  }
`

export default StyleWrapper
