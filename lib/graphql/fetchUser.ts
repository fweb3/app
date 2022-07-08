import { apolloClient } from './apolloClient'
// eslint-disable-next-line
import { GameError } from './../../types'

const fetchOrCreateUser = async () => {
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query User {
          countries {
            code
            name
            emoji
          }
        }
      `,
    })
  } catch (err: GameError) {
    console.error(err.message)
    return null
  }
}

const fetchUser = async () => {}

const createUser = async () => {}

export { fetchUser, fetchOrCreateUser, createUser }
