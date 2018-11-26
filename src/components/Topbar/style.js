import styled from 'styled-components'

import { palette } from 'styled-theme'


const notificationMarkerSize = 12

const StyleWrapper = styled.div`
  .topbar {
    background-color: ${palette('adeptLochmara5', 0)};
    border-bottom: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    padding: 0;
    height: 70px;
    line-height: inherit;
  }

  .logoWrapper {
    height: 100%;
    width: 220px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .topbarContent {
    flex: 1 1 0;
    padding: 10px;
    color: #fff;
  }

  .siderTriggerBtn {
    font-size: 28px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    display: block;
  }

  a, button {
    color: inherit;

    &:hover {
      color: inherit;
      opacity: 0.6;
      transition: opacity 0.3s;
    }
  }

  .icon-user {
    font-size: 20px;
  }

  .notification-button-wrapper {
    display: inline-block;
    position: relative;
    font-size: 20px;

    &.has-notifications:before {
      content: '';
      position: absolute;
      display: block;
      width: ${notificationMarkerSize}px;
      height: ${notificationMarkerSize}px;
      right: 4px;
      top: 1px;
      background-color: ${palette('success', 0)};
      border-radius: 999px;
      z-index: 1;
    }
  }

  .user-menu-link {
    line-height: 30px;
    display: inline-block;
    margin-left: 7px;

    .icon-user {
      font-size: 20px !important;
      margin-right: 5px;
    }

    span {
      position: relative;
      top: -2px;
    }
  }
`

export default StyleWrapper
