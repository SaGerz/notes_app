'use client';

import { Box, Button, FormControl, FormLabel, Input, Textarea, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logika untuk submit form, seperti menyimpan data
    console.log('Title:', title);
    console.log('Body:', body);
  
    const response = await fetch('http://localhost:5000/api/notes', {
        method:'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body})
    })

    const data = await response.json();
    console.log('Note Created : ', data); 

    router.push('/')
};

  return (
    <Center h="100vh">
      <Box width="md" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <FormControl id="title" mb={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Masukkan judul catatan" 
            />
          </FormControl>
          <FormControl id="body" mb={4} isRequired>
            <FormLabel>Body</FormLabel>
            <Textarea 
              value={body} 
              onChange={(e) => setBody(e.target.value)} 
              placeholder="Masukkan isi catatan" 
            />
          </FormControl>
          <Button bg="#6F8FAF" type="submit" width="full" color="white">
                Simpan Catatan
          </Button>
        </form>
      </Box>
    </Center>
  );
}

export default create;
