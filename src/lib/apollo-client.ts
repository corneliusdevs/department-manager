// "use client";

// import { HttpLink } from "@apollo/client";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { SetContextLink } from "@apollo/client/link/context";

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, //  GraphQL server URL
// });


// const authLink = new SetContextLink((prevContext, operation) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   return {
//     headers: {
//       ...prevContext.headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });


import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, //  GraphQL server URL
});


const authLink = new SetContextLink((prevContext, operation) => {
  // Use "accessToken" to retrieve the token stored during login
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});