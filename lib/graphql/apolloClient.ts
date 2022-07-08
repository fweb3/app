import { ApolloClient, InMemoryCache } from '@apollo/client'

const { FWEB3_API_URL } = process.env

const uri = `${FWEB3_API_URL}/graphql`
const apolloClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
})

export { apolloClient }
