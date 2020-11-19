import { DocumentNode } from 'apollo-boost';
import { PrismicLink } from 'apollo-link-prismic';
import { useQuery } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: PrismicLink({ uri: 'https://toyproject.prismic.io/graphql' }),
  cache: new InMemoryCache()
});

export default function usePrismic<T = any>(query: DocumentNode) {
  const { loading, error, data } = useQuery<T>(query, {
    client
  });

  return { loading, error, data };
}
