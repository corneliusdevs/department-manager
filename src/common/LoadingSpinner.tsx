import { Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

// Define the component's props interface
interface LoadingScreenProps {
  message?: string;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  minHeight?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message ,
  spinnerSize = 'lg',
  minHeight = '50vh', 
}) => {
  return (
    <Flex
      minH={minHeight} 
      w="full" 
      align="center" 
      justify="center" 
      direction="column" 
      className="p-4" 
    >
      {/* Chakra UI Spinner Component */}
      <Spinner
        size={spinnerSize}
        color="black.500"
      />

      {/* Optional: Display the message below the spinner */}
      <Text mt={4} fontSize="lg" color="gray.600" className="mt-4">
        {message}
      </Text>
    </Flex>
  );
};

export default LoadingScreen;