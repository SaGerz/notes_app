'use client'

import { Box, Button, Center, Text, SimpleGrid, Container } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Home from '@/components/Home';

const page = () => {
    const router = useRouter()        
    const handleRoutes = () => {
        router.push('/create-notes')
    }
  
    const [notes, setNotes] = useState([])

    useEffect(() => {
      const fecthNotes = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/notes');
          if(response.ok) {
            const data = await response.json();
            setNotes(data)
          } else {
            console.error('Failed to fetch notes:', response.statusText);
          }
        } catch (error){
          console.log('Error fetchinh notes: ', error)
        }
      }

      fecthNotes();
    }, [])

    return (
      <Container maxW="container.xl" mt={10}>
          {notes.length === 0 ? (
              <Center h="100vh" flexDirection="column">
                  <Text fontSize="4xl" mb={4}>
                      Tidak ada catatan
                  </Text>
                  <Button 
                      borderRadius="full"
                      variant="solid"
                      size="lg"
                      px={8}
                      onClick={handleRoutes}
                      bg="#6F8FAF"
                      color="white"
                      >
                      Buat Catatan Baru
                  </Button>
              </Center>
          ) : (
            <>
              <Home notes={notes} />
              <Center mt={10}>
                 <Button 
                     borderRadius="full"
                     variant="solid"
                     size="lg"
                     px={8}
                     onClick={handleRoutes}
                     mb={10}
                     bg="#6F8FAF"
                     color="white"
                     >
                     Buat Catatan Baru
                 </Button>
              </Center>
            </>
          )}
      </Container>
  );
}

export default page;