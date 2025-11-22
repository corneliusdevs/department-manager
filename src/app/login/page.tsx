"use client";

import { useState } from 'react';
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

      localStorage.setItem('accessToken', token);
      router.push('/departments');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="80px">
      <VStack >
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

        <Button w="full" onClick={handleLogin} loading={loading}>
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