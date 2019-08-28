import firebase from 'react-native-firebase';
import merge from 'lodash/merge';
import ApolloClient from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import covers from 'constants/covers';
import { getLanguage } from 'utils';
import * as resolvers from './resolvers';
import config from './config';

const customFetch = async (uri: RequestInfo, options?: RequestInit) => {
  const { currentUser } = firebase.auth();
  if (options && options.headers && currentUser) {
    (options.headers as any).Authorization = await currentUser.getIdToken();
  }

  return fetch(uri, options);
};

const link = new BatchHttpLink({
  uri: `${config.apiUrl}?language=${getLanguage()}`,
  fetch: customFetch,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  resolvers: Object.values(resolvers).reduce((c, r) => merge(c, r), {}),
  typeDefs: gql`
    type Modal {
      id: ID!
      isVisible: Boolean!
    }

    extend type Query {
      modal(id: ID!): Modal
      searchQuery: String
      cover: String
    }

    extend type Mutation {
      showModal(id: ID!): Boolean
      hideModal(id: ID!): Boolean
      shuffleCovers: Boolean
    }
  `,
});

client.cache.writeData({
  data: {
    modals: [{
      __typename: 'Modal',
      id: 'Auth',
      isVisible: false,
    }, {
      __typename: 'Modal',
      id: 'Reply',
      isVisible: false,
    }, {
      __typename: 'Modal',
      id: 'Cover',
      isVisible: false,
    }],
    searchQuery: '',
    cover: '',
    covers,
  },
});

export default client;
