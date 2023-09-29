import React, { useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Flex, useToast, Center, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FormInput from '@/components/form/FormInput';
import { useMutation } from 'react-query';
import { createStore } from '@/apis/store';

const CreateModal = ({ modal }) => {
  const [storeName, setStoreName] = useState('');
  const toast = useToast();

  const createStoreMutation = useMutation(createStore, {
    onSuccess: res => {
      toast({
        title: "Created",
        description: `Store created`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      modal.onClose()
    },
    onError: res => {
      toast({
        title: "Sorry...",
        description: `An error occurred while creating store`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const onCreate = () => {
    if (storeName)
      createStoreMutation.mutate({ name: storeName })
  }


  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='600px' minHeight={'260px'}>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box my='10%'>
            <Heading size='md' textAlign='center'>Create a store</Heading>
            <FormInput
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder={'Enter store name'}
            />
            <Button mt='20px' isLoading={createStoreMutation.isLoading} w='full' onClick={onCreate}>Create</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateModal