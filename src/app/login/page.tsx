// "use client";

// import { useState } from 'react';
// import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
// import { useMutation } from '@apollo/client/react';
// import { useRouter } from 'next/navigation';
// import { LoginMutationData, LoginMutationVars } from '@/types/graphql';
// import { LOGIN } from '@/grapghql/mutations/login.mutation';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  
//   // New state to manage client-side validation errors
//   const [validationError, setValidationError] = useState('');

//   const router = useRouter();

//   const [login, { loading, error }] = useMutation<
//     LoginMutationData,
//     LoginMutationVars
//   >(LOGIN);

//   const handleLogin = async () => {
//     // 1. Reset previous validation errors
//     setValidationError('');
    
//     // 2. Client-Side Validation Checks
//     if (!username.trim() || !password.trim()) {
//       setValidationError('Username and password fields cannot be empty.');
//       return; // Stop the login process
//     }

//     if (username.trim().length < 3) {
//       setValidationError('Username must be at least 3 characters long.');
//       return; // Stop the login process
//     }

//     if (password.trim().length < 6) {
//       setValidationError('Password must be at least 6 characters long.');
//       return; // Stop the login process
//     }

//     try {
//       const res = await login({
//         variables: { input: { username, password } },
//       });

//       if (!res.data) throw new Error('No data returned from login mutation');

//       const token = res.data.login.accessToken;

//       localStorage.setItem('accessToken', token);
//       router.push('/departments');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <Box maxW="400px" mx="auto" mt="80px">
//       <VStack >
//         <Heading size="lg">Login</Heading>

//         <Input
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Input
//           placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button w="full" onClick={handleLogin} loading={loading}>
//           Login
//         </Button>

//         {/* Display Client-Side Validation Error */}
//         {validationError && <Text color="red.500">{validationError}</Text>}
        
//         {/* Display Server-Side Error (from Apollo) */}
//         {error && <Text color="red.500">Invalid login credentials</Text>}
//       </VStack>
//     </Box>
//   );
// }


"use client";

import { useState, useEffect } from 'react'; // 1. Import useEffect
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { LoginMutationData, LoginMutationVars } from '@/types/graphql';
import { LOGIN } from '@/grapghql/mutations/login.mutation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // New state to manage client-side validation errors
  const [validationError, setValidationError] = useState('');

  const router = useRouter();

  const [login, { loading, error }] = useMutation<
    LoginMutationData,
    LoginMutationVars
  >(LOGIN);

  // 2. Add useEffect to check for accessToken and redirect
  useEffect(() => {
    // Check if we are running in the browser (client-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        // Token found: Redirect the user away from the login page
        router.replace('/departments'); // Use router.replace to prevent back navigation to login
      }
    }
  }, [router]); // Dependency on router is good practice

  const handleLogin = async () => {
    // 1. Reset previous validation errors
    setValidationError('');
    
    // 2. Client-Side Validation Checks
    if (!username.trim() || !password.trim()) {
      setValidationError('Username and password fields cannot be empty.');
      return; // Stop the login process
    }

    if (username.trim().length < 3) {
      setValidationError('Username must be at least 3 characters long.');
      return; // Stop the login process
    }

    if (password.trim().length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return; // Stop the login process
    }

    try {
      const res = await login({
        variables: { input: { username, password } },
      });

      if (!res.data) throw new Error('No data returned from login mutation');

      const token = res.data.login.accessToken;

      // Store the token and redirect only after successful login
      localStorage.setItem('accessToken', token);
      router.push('/departments');
    } catch (err) {
      console.log(err);
    }
  };
  
  // Since we redirect immediately if a token exists, we need to handle 
  // the case where the component might render briefly while redirecting.
  // We can render null or a loading spinner if the token is present to avoid flicker.
  const tokenExists = typeof window !== 'undefined' && localStorage.getItem('accessToken');
  
  if (tokenExists) {
    return (
      <Box maxW="400px" mx="auto" mt="80px">
        <Text>Redirecting...</Text>
      </Box>
    ); // Optional: return null or a loading state while redirecting
  }


  return (
    <Box maxW="400px" mx="auto" mt="80px">
      <VStack>
        <Heading size="lg">Login</Heading>

        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button w="full" onClick={handleLogin} loading={loading} colorScheme="blue">
          Login
        </Button>

        {/* Display Client-Side Validation Error */}
        {validationError && <Text color="red.500">{validationError}</Text>}
        
        {/* Display Server-Side Error (from Apollo) */}
        {error && <Text color="red.500">Invalid login credentials</Text>}
      </VStack>
    </Box>
  );
}