/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation Login($password: String!, $email: String!) {\n  login(password: $password, email: $email) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "query Me {\n  me {\n    id\n    email\n  }\n}": types.MeDocument,
    "query QueryItems($itemCode: Int!, $startDate: DateTime!, $endDate: DateTime!) {\n  queryItems(itemCode: $itemCode, startDate: $startDate, endDate: $endDate) {\n    unitPrice\n    contractor\n    bidDate\n  }\n}": types.QueryItemsDocument,
    "mutation Register($email: String!, $password: String!) {\n  register(email: $email, password: $password)\n}": types.RegisterDocument,
    "query getItems($searchInput: String!) {\n  items(searchInput: $searchInput) {\n    item_code\n    item_description\n    item_unit\n  }\n}": types.GetItemsDocument,
};

export function graphql(source: "mutation Login($password: String!, $email: String!) {\n  login(password: $password, email: $email) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}"): (typeof documents)["mutation Login($password: String!, $email: String!) {\n  login(password: $password, email: $email) {\n    accessToken\n    user {\n      id\n      email\n    }\n  }\n}"];
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
export function graphql(source: "query Me {\n  me {\n    id\n    email\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    email\n  }\n}"];
export function graphql(source: "query QueryItems($itemCode: Int!, $startDate: DateTime!, $endDate: DateTime!) {\n  queryItems(itemCode: $itemCode, startDate: $startDate, endDate: $endDate) {\n    unitPrice\n    contractor\n    bidDate\n  }\n}"): (typeof documents)["query QueryItems($itemCode: Int!, $startDate: DateTime!, $endDate: DateTime!) {\n  queryItems(itemCode: $itemCode, startDate: $startDate, endDate: $endDate) {\n    unitPrice\n    contractor\n    bidDate\n  }\n}"];
export function graphql(source: "mutation Register($email: String!, $password: String!) {\n  register(email: $email, password: $password)\n}"): (typeof documents)["mutation Register($email: String!, $password: String!) {\n  register(email: $email, password: $password)\n}"];
export function graphql(source: "query getItems($searchInput: String!) {\n  items(searchInput: $searchInput) {\n    item_code\n    item_description\n    item_unit\n  }\n}"): (typeof documents)["query getItems($searchInput: String!) {\n  items(searchInput: $searchInput) {\n    item_code\n    item_description\n    item_unit\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;