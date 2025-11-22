import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { toaster } from "@/components/ui/toaster";

// Detect and handle authentication errors and redirect to login on 401 or session expiry
export const errorLink = new ErrorLink(({ error }) => {
  // GraphQL errors
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach((err) => {
        console.log("GraphQL Error:", err);
      if (err.extensions?.status === 401) {
        handleSessionExpired();
      }
    });
  }

  // Apollo protocol errors (Apollo Server 4+)
  else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach((err) => {
        console.log("Protocol Error:", err);
      if (err.extensions?.status === 401) {
        handleSessionExpired();
      }
    });
  }

  // Network errors (fetch 401)
  else {
    const network = error as any;
        console.log("Network Error:", network);

    if (
      network?.statusCode === 401 ||
      network?.response?.status === 401
    ) {
      handleSessionExpired();
    }
  }
});

function handleSessionExpired() {
  // Clear auth token
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
  }

  // Show Chakra v3 toast
  toaster.create({
    title: "Session expired",
    description: "Please log in again.",
    type: "warning",
  });

  // Redirect to login
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}
