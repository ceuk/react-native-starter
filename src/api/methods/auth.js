import { makeAuthenticatedRequest, makeUnauthenticatedRequest } from '..'

/**
 * Attempts to log in using the supplied credentials
 *
 * @param credentials email and password
 * @returns A promisified http call that resolves to an either
 */
export const loginRequest = ({ email, password }) => {
  return makeUnauthenticatedRequest({
    url: '/auth/login',
    method: 'POST',
    data: {
      email,
      password
    }
  })
}

/**
 * Attempts to validated locally-cached token
 *
 * @returns A promisified http call that resolves to an either
 */
export const validateTokenRequest = () => {
  return makeAuthenticatedRequest({
    url: '/user/validateToken',
    method: 'GET'
  })
}
