'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Box, Button, Container, Input, Textarea, VStack, HStack, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Text } from '@chakra-ui/react';

const details = ({ params }) => {
    const router = useRouter();
    const { id } = params;

    const [note, setNote] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelRef = useRef();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNote(data);
                } else {
                    console.error('Failed to fetch note:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to update note:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to delete note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value
        }));
    };

    const onDeleteConfirm = () => {
        setIsDeleting(true);
        handleDelete();
        setIsOpen(false);
        setIsDeleting(false);
    };

    if (!note) {
        return (
            <Container 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" // Mengatur tinggi container agar penuh satu layar
            >
            <Text fontSize="2xl" fontWeight="bold">
                Loading...
            </Text>
        </Container>
        )
    }

    return (
        <Container maxW="container.md" mt={10}>
            <Box   
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg" 
            >
            <VStack spacing={4} align="stretch">
                <Input
                    name="title"
                    value={note.title}
                    placeholder="Title"
                    onChange={handleChange}
                />
                <Textarea
                    name="body"
                    value={note.body}
                    placeholder="Body"
                    onChange={handleChange}
                    resize="none"
                    rows={Math.max(note.body.split('\n').length, 6)}
                />
                <HStack spacing={4} justify="flex-end">
                    <Button colorScheme="red" onClick={() => setIsOpen(true)}>
                        Delete
                    </Button>
                    <Button bg="#6F8FAF" color="white" onClick={handleUpdate}>
                        Update
                    </Button>
                </HStack>
            </VStack>
            </Box>

            {/* AlertDialog for delete confirmation */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Confirm Deletion
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Apakah kamu yakin ingin menghapus note ini? 
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button bg="#6F8FAF" color="white" ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDeleteConfirm} ml={3} isLoading={isDeleting}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Container>
    );
};

export default details;
