'use client'

import { Box, Button, Center, Text, SimpleGrid, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Home = ({ notes }) => {
    const router = useRouter()        
    const handleRoutes = () => {
        router.push('/create-notes')
    }

    const handleViewDetails = (id) => {
        router.push(`/details-notes/${id}`)
    }

    return (
      <Container maxW="container.xl" mt={10}>
            <>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  {notes.map(note => (
                      <Box
                          key={note.id}
                          p={5}
                          shadow="md"
                          borderWidth="1px"
                          borderRadius="lg"
                       >
                          <Text fontSize="xl" fontWeight="bold">
                              {note.title}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                              Created at: {new Date(note.created_at).toLocaleString()}
                          </Text>
                          <Text textAlign="justify" mt={4}>{note.body}</Text>
                          <Button
                            mt={4}
                            bg="#6F8FAF"
                            color="white"
                            onClick={() => handleViewDetails(note.id)} >
                                See Details
                          </Button>
                      </Box>
                  ))}
              </SimpleGrid>
            </>
      </Container>
  );
}

export default Home;