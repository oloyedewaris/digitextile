import React from 'react'
import { Flex, Image, Spinner } from '@chakra-ui/react';

const Preloader = () => {
    return (
        <Flex justify='center' align='center' h='100vh' w='100vw'>
            <Spinner />
        </Flex>
    )
}

export default Preloader