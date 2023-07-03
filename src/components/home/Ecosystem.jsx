import { Box, Flex, Text } from "@chakra-ui/react";

const Ecosystem = () => {
    return (
        <Flex bg='#8D99AE' px='78px' py='112px' mt='128px' minH='819px' justify={'space-between'} align={'center'}>
            <Box color={'white'}>

                <Text fontSize={'28px'} fontWeight={700}>Digi Textile Ecosystem.</Text>
                <Text fontSize={'28px'} fontWeight={700} mt='40px'>Connecting the fashion industry</Text>
                <Text fontSize={'28px'} fontWeight={500}>
                    Bringing various possibilities into existence.
                    Buy, sell, collaborate and stay up to date wit latest trends.
                </Text>
            </Box>
        </Flex>
    )
}

export default Ecosystem;