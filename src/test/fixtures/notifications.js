import Immutable from 'immutable'

import { Notification } from 'store/modules/notifications'


export default Immutable.List([
  Notification({
    "id": 10,
    "level": "INFO",
    "created": "2018-12-13T08:57:33.271973Z",
    "message": "Loading step gibson-commission-step"
  }),
  Notification({
    "id": 13,
    "level": "INFO",
    "created": "2018-12-13T08:57:38.023896Z",
    "message": "Start Commissioning Step"
  }),
  Notification({
    "id": 14,
    "level": "ERROR",
    "created": "2018-12-13T08:57:43.794740Z",
    "message": "Performing step failure routine."
  }),
])
