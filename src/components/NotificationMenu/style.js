import styled from 'styled-components'


const StyleWrapper = styled.div`
  width: 400px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 10px;
  right: -45px;

  .inner-wrapper {
    position: relative;
    z-index: 2;
    background: #fff;
  }

  &:after {
    content: '';
    display: block;
    background: #fff;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 50px;
    top: 0;
    transform-origin: center;
    transform: translateY(-50%) rotate(45deg);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .spinner,
  .error {
    padding: 15px 10px;
  }

  .messages-link {
    display: block;
    width: 100%;
    color: inherit !important;
    padding: 15px 10px;
    text-align: center;
    background-color: #f0f0f1;
  }
`

export default StyleWrapper
