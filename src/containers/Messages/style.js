import styled from 'styled-components'


const StyleWrapper = styled.div`
  overflow: hidden;

  .filterBar {
    display: flex;
    min-height: 70px;
    align-items: center;
    text-align: center;

    label {
      margin-right: 10px;
    }

    .filter {
      flex: 0 0 300px;
      padding: 0 10px;
    }

    .search {
      flex: 1 1 0;
      padding: 0 10px;
    }

    .bpFilterSelect {
      width: 200px;
      max-width: 100%;
    }

    .searchInput {
      width: 350px;
      max-width: 100%;
    }

    @media screen and (max-width: 767px) {
      display: block;
      height: auto;
      padding: 15px 10px;

      .filter,
      .search {
        display: block;
      }

      .filter {
        margin-bottom: 15px;
      }
    }
  }
`

export default StyleWrapper
