"use client";
import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  VStack,
  Link,
  Icon,
} from "@chakra-ui/react";

// --- Configuration for Navigation Links ---
interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Departments", href: "/departments" },
  { label: "Create", href: "/create" },
  { label: "Logout", href: "/logout" },
  { label: "Login", href: "/login" },

];

// Define paths where the NavBar should be hidden
const EXCLUDED_PATHS = ['/login'];

// --- NavBar Component (Chakra UI - Sleek Style) ---
export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Using useState directly

  // 1. Logic for Exclusion
  const shouldHideNavbar = EXCLUDED_PATHS.includes(pathname);

  if (shouldHideNavbar) {
    return null;
  }
  
  const onToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Box
      bg="white"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.100"
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={{ base: 4, sm: 6, lg: 8 }}
        minH="16"
        align="center"
        justify="space-between"
      >
        {/* Logo/Title */}
        <Flex flexShrink={0} align="center">
          <Text
            href={"/departments"}
            as={NextLink}
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="extrabold"
            color="indigo.600"
            letterSpacing="tight"
            _hover={{ textDecoration: 'none' }}
          >
            Tactology Global
          </Text>
        </Flex>

        {/* Desktop Navigation Links (Hidden on mobile) */}
        <DesktopNav />

        {/* Mobile Menu Button (Hidden on desktop) */}
        <Flex display={{ base: "flex", md: "none" }}>
          {/* Using a standard Button component */}
          <Button
            onClick={onToggle}
            aria-label="Toggle menu"
            variant="ghost"
            p={2}
            minW="auto" // Important to remove default Chakra button minimum width
            h="auto"     // Important to maintain icon size
            borderRadius="lg"
            color="gray.700"
            _hover={{ bg: "gray.50" }}
          >
            {isMobileMenuOpen ? (
              <Icon as={X} w={6} h={6} color="indigo.600" />
            ) : (
              <Icon as={Menu} w={6} h={6} color="gray.600" />
            )}
          </Button>
        </Flex>
      </Flex>

      {/* Mobile Menu Content: Conditional Box rendering replaces Collapse */}
      {isMobileMenuOpen && (
        <Box
          display={{ base: "block", md: "none" }}
          // Added padding and border here instead of inside MobileNav
          py={3}
          bg="gray.50"
          borderTop="1px"
          borderColor="gray.200"
        >
          <MobileNav />
        </Box>
      )}
    </Box>
  );
}

// ------------------------------------------------------------------
// --- Desktop Navigation Sub-Component ---
// ------------------------------------------------------------------
const DesktopNav: React.FC = () => {
  return (
    <Stack
      direction="row"
      display={{ base: "none", md: "flex" }}
      ml={10}
      align="center"
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          as={NextLink}
          href={item.href}
          px={3}
          py={2}
          fontSize="sm"
          fontWeight="semibold"
          color="gray.600"
          borderRadius="lg"
          transition="all 200ms ease-in-out"
          _hover={{
            textDecoration: "none",
            bg: "indigo.50",
            color: "indigo.700",
          }}
        >
          {item.label}
        </Link>
      ))}
    </Stack>
  );
};

// ------------------------------------------------------------------
// --- Mobile Navigation Sub-Component ---
// ------------------------------------------------------------------
const MobileNav: React.FC = () => {
  return (
    // Removed the background and border here, moved to the parent Box for direct control
    <VStack
      as="div"
      px={{ base: 2, sm: 3 }}
      align="stretch"
    >
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          as={NextLink}
          href={item.href}
          display="block"
          w="full"
          px={4}
          py={2}
          fontSize="base"
          fontWeight="medium"
          color="gray.700"
          borderRadius="md"
          transition="all 150ms ease-in-out"
          _hover={{
            textDecoration: "none",
            bg: "indigo.100",
            color: "indigo.800",
          }}
        >
          {item.label}
        </Link>
      ))}
    </VStack>
  );
};