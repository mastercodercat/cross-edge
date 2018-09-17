import { signOut } from 'store/modules/auth'


const authMiddleware = store => next => action => {
  if (action.type.substr(action.type.length - 5) === '/fail') {
    const { detail } = action.payload
    if (detail === 'Signature has expired.') {
      store.dispatch(signOut())
    }
  }
  return next(action)
}

export default authMiddleware
