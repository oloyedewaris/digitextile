import LayoutView from '@/components/layout';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Category = () => {

	return (
		<LayoutView noPadding>
			<Box px={{ base: '10px', md: '48px' }} my={{ base: '80px', md: '150px' }}>
				<Text mb={{ base: '10px', md: '22px' }} fontWeight={700} fontSize={{ base: '20px', md: '48px' }}>Messages</Text>
			</Box>
		</LayoutView>
	)
}

export default Category