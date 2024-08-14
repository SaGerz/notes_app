import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <Box p={4} bg="#6F8FAF">
      <Flex align="center" justify="space-between" p={4}>
        {/* Logo */}
        <Text fontSize="4xl" fontWeight="bold" color="white">
          <Link href={'/'} >
            Notes APP
          </Link>
        </Text>
        
        {/* Heading */}
        <Heading as="h3" size="md" color="white">
          Get Started
        </Heading>
      </Flex>
    </Box>
  );
}

export default Navbar;
