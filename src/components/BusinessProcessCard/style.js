import styled from 'styled-components'


const StyleWrapper = styled.div`
  margin-bottom: 30px;

  .image-wrapper {
    position: relative;
    padding-top: 35%;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.05);
  }

  .image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .descriptionWrapper {
    height: 85px;
    overflow: hidden;
  }
`

export default StyleWrapper
