/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Item = {
  __typename?: 'Item';
  item_code: Scalars['Int'];
  item_description: Scalars['String'];
  item_unit: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};

export type Price = {
  __typename?: 'Price';
  contractor: Scalars['String'];
  id: Scalars['Int'];
  item: Item;
  project: Project;
  quantity: Scalars['Float'];
  unit_price: Scalars['Float'];
};

export type Project = {
  __typename?: 'Project';
  bid_date: Scalars['DateTime'];
  county: Scalars['String'];
  project: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  get_item_prices: Array<Price>;
  get_prices_by_item: Array<Price>;
  items: Array<Item>;
  me?: Maybe<User>;
  projects: Array<Project>;
  queryItems: Array<QueryItemsResult>;
  users: Array<User>;
};


export type QueryGet_Prices_By_ItemArgs = {
  item_code: Scalars['Float'];
};


export type QueryItemsArgs = {
  searchInput: Scalars['String'];
};


export type QueryQueryItemsArgs = {
  endDate: Scalars['DateTime'];
  itemCode: Scalars['Int'];
  startDate: Scalars['DateTime'];
};

export type QueryItemsResult = {
  __typename?: 'QueryItemsResult';
  bidDate: Scalars['DateTime'];
  contractor: Scalars['String'];
  unitPrice: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, email: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string } | null };

export type QueryItemsQueryVariables = Exact<{
  itemCode: Scalars['Int'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
}>;


export type QueryItemsQuery = { __typename?: 'Query', queryItems: Array<{ __typename?: 'QueryItemsResult', unitPrice: number, contractor: string, bidDate: any }> };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type GetItemsQueryVariables = Exact<{
  searchInput: Scalars['String'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', item_code: number, item_description: string, item_unit: string }> };


export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const QueryItemsDocument = gql`
    query QueryItems($itemCode: Int!, $startDate: DateTime!, $endDate: DateTime!) {
  queryItems(itemCode: $itemCode, startDate: $startDate, endDate: $endDate) {
    unitPrice
    contractor
    bidDate
  }
}
    `;

/**
 * __useQueryItemsQuery__
 *
 * To run a query within a React component, call `useQueryItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryItemsQuery({
 *   variables: {
 *      itemCode: // value for 'itemCode'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useQueryItemsQuery(baseOptions: Apollo.QueryHookOptions<QueryItemsQuery, QueryItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryItemsQuery, QueryItemsQueryVariables>(QueryItemsDocument, options);
      }
export function useQueryItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryItemsQuery, QueryItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryItemsQuery, QueryItemsQueryVariables>(QueryItemsDocument, options);
        }
export type QueryItemsQueryHookResult = ReturnType<typeof useQueryItemsQuery>;
export type QueryItemsLazyQueryHookResult = ReturnType<typeof useQueryItemsLazyQuery>;
export type QueryItemsQueryResult = Apollo.QueryResult<QueryItemsQuery, QueryItemsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetItemsDocument = gql`
    query getItems($searchInput: String!) {
  items(searchInput: $searchInput) {
    item_code
    item_description
    item_unit
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions: Apollo.QueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsQueryResult = Apollo.QueryResult<GetItemsQuery, GetItemsQueryVariables>;