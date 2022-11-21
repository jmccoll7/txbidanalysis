import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  Observable,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { App } from "./App";
import { getAccessToken, setAccessToken } from "./access-token";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const cache = new InMemoryCache();

// const request = async (operation) => {
//   const token = await AsyncStorage.getItem('token');
//   operation.setContext({
//     headers: {
//       authorization: token
//     }
//   });
// };

const requestLink = new ApolloLink(
  (operation: any, forward: any) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));
      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp }: any = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      // handleResponse: (operation, accessTokenField) => (response) => {
      //   // here you can parse response, handle errors, prepare returned token to
      //   // further operations
      //   // returned object should be like this:
      //   // {
      //   //    access_token: 'token string here'
      //   // }
      // },
      handleError: (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);

        // When the browser is offline and an error occurs we don’t want the user to be logged out of course.
        // We also don’t want to delete a JWT token from the `localStorage` in this case of course.
        // if (
        //   !navigator.onLine ||
        //   (error instanceof TypeError &&
        //     error.message === "Network request failed")
        // ) {
        //   console.log("Offline -> do nothing 🍵");
        // } else {
        //   console.log("Online -> log out 👋");

        //   // your custom action here
        //   user.logout();
        // }
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log("graphQLErrors:", graphQLErrors);
      console.log("networkError:", networkError);
      // if (graphQLErrors) {
      //   sendToLoggingService(graphQLErrors);
      // }
      // if (networkError) {
      //   logoutUser();
      // }
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
  cache,
});

// const accessToken = getAccessToken();

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
//   credentials: "include",
//   headers: accessToken
//     ? {
//         authorization: `bearer ${accessToken}`,
//       }
//     : {},
// });

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ColorModeScript />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
