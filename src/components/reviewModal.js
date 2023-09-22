import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Heading, Flex, useToast, Center, Box, Image, Text, Button, HStack, Input } from '@chakra-ui/react';
import avatar from '@/assets/images/avatar.png';
import { RiStarLine, RiStarSFill } from 'react-icons/ri';

const ReviewModal = ({ modal }) => {
  return (
    <Modal isCentered isOpen={modal?.isOpen} onClose={modal?.onClose}>
      <ModalOverlay />
      <ModalContent h='400px' px='20px'>
        <Flex py='10%' direction={'column'} h='full' justify={'space-between'}>
          <Flex align={'center'} h='95px' gap='15px'>
            <Image src={avatar.src} borderRadius={'8px'} w='90px' h='90px' />
            <Flex direction='column' h='full' justify='space-between'>
              <Text mb='4px' fontWeight={500} fontSize={'18px'} color='#212922'>
                Soft Fabric Sofa
              </Text>
              <Text fontWeight={400} fontSize={'13px'} color='#212922' noOfLines={2}>
                Joho
              </Text>
            </Flex>
          </Flex>

          <Text fontWeight={500} fontSize={'20px'} color='#1C1D2C'>Was this sale successful?</Text>

          <Flex gap='12px' align='center'>
            <Button onClick={modal?.onOpen} bg='#2B2D42' color='white'>Yes</Button>
            <Button onClick={modal?.onClose}>No</Button>
          </Flex>

          <Input
            w='full'
            placeholder='Add a comment'
            color='#B0ABAB'
            borderRadius={0}
            border={'none'}
            borderBottom={'1px solid #B0ABAB'}
          />

          <HStack justify={'space-between'} spacing={'3px'} align={'center'} gap='2px'>
            <Flex align={'center'} gap='10px'>
              <Text fontWeight={400} fontSize={'16px'} color='#212922'>Leave a rating</Text>
              <HStack align={'center'} gap='-2px'>
                <RiStarLine />
                <RiStarLine />
                <RiStarLine />
                <RiStarLine />
                <RiStarLine />
              </HStack>
            </Flex>
            <Button onClick={modal?.onOpen} bg='#2B2D42' color='white'>Post</Button>
          </HStack>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default ReviewModal