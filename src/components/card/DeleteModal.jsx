import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Flex, useToast, Center, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Button from '../button';

const DeleteModal = ({ deleteModal, onDelete }) => {

  return (
    <Modal isCentered isOpen={deleteModal?.isOpen} onClose={deleteModal?.onClose}>
      <ModalOverlay />
      <ModalContent maxW='600px' minHeight={'260px'}>
        <ModalBody maxH='90vh' overflowY={'scroll'}>
          <Box my='10%'>
            <Heading size='md' textAlign='center'>Are you sure you want to delete category?</Heading>
            <Flex justify={'space-between'} align='center' mt='30px'>
              <Button w='45%' onClick={onDelete}>Yes</Button>
              <Button w='45%' onClick={deleteModal?.onClose}>No</Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal