// import LayoutView from '@/components/layout';
// import { Box, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Text } from '@chakra-ui/react';
// import React from 'react';
// import { extended } from '@/constant/hot-drop';
// import searchIcon from '@/assets/images/search-icon.png';
// import hotDrop from '@/assets/images/hot-drop-main.png';
// import HotDropDetail from '@/components/card/HotDropsCardDetails';
// import person from '@/assets/images/person/person3.png'
// import hotDropImg from '@/assets/images/hot-drop-details.png';
// import person1 from '@/assets/images/person/person3.png'
// import FormTextarea from '@/components/form/FormTextarea';

// const HotDrops = () => {
//   const data = {
//     image: hotDropImg.src,
//     person: person1.src,
//     subTitle: `Viverra enim sed pulvinar sit cursus tortor in. Non nisi eu tempor mauris volutpat nec. Sapien elit ultrices lorem lorem neque enim at. Mauris aliquet nunc tortor congue senectus arcu eu in sapien. Purus egestas mauris diam facilisis aliquet nulla integer imperdiet lorem. Viverra enim tellus fringilla integer id ligula. Elementum neque fringilla integer ut platea nisl. Vel est tincidunt ornare velit id magna egestas non. Nec amet tristique eget ullamcorper dignissim. Enim maecenas a maecenas eget. Turpis nibh feugiat euismod elit vel vivamus mi adipiscing. Morbi porttitor hendrerit sit vitae eu ut. Commodo proin tincidunt aliquam ultrices aliquam neque.
//     Risus cursus vivamus ullamcorper volutpat augue egestas lectus magna. At nunc morbi dictum interdum risus porttitor euismod facilisi aliquet. Nisi massa luctus pellentesque amet integer quam dignissim ultrices. Id nisl sollicitudin malesuada pretium bibendum tempor viverra. Amet sed nulla commodo at facilisi. Tellus sagittis ipsum sollicitudin gravida adipiscing. Aliquet bibendum diam lacus gravida ut enim tristique egestas cursus. Enim sed vel sit pellentesque in diam amet.
//     Velit hac amet purus in sagittis. Tincidunt ac in quisque aliquam. Sit dolor magna dolor tempus ligula elementum velit at. Turpis lobortis dignissim tincidunt quis proin sed. Lectus euismod ut felis sed porttitor. Sit amet vel id feugiat tellus tincidunt nunc dignissim. Scelerisque id in arcu pellentesque ornare molestie. Nulla volutpat etiam odio in neque porttitor. Mauris cursus cursus in nulla. Tristique morbi id pulvinar id nisl proin eu phasellus fringilla. Id accumsan magna est morbi. Ac non nulla enim malesuada. Et placerat ultricies eget semper sed quis nec. Augue volutpat hendrerit purus dui facilisi magna ac.
//     Cursus id ultrices mattis porttitor diam arcu commodo. Posuere arcu dolor ac eget scelerisque sollicitudin a neque. Pharetra urna elit arcu convallis vitae ut blandit gravida tempor. Blandit erat ultricies dui sagittis turpis arcu risus nunc. Pellentesque bibendum volutpat integer et ut faucibus. Eget tellus vel et quam viverra. Nisl pharetra ridiculus ac odio. A eget urna odio non nisi id venenatis sem. Blandit posuere quis ullamcorper leo porttitor vitae mattis quam volutpat. Risus pharetra tempor donec malesuada volutpat pretium vitae consectetur.
//     `,
//     time: '10, May, 2023',
//     title: 'Fashion, technology and travelling.',
//     category: 'Fashion',
//     timeToRead: '8min read',
//     user: 'Waris Oloyede',
//     comments: [
//       {
//         picture: person1.src,
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eros nunc lectus nibh non aenean. Bibendum orci convallis ultricies donec vitae sed nunc aliquet. Sollicitudin et at.',
//         name: 'Owati Fiyin'
//       },
//       {
//         picture: person1.src,
//         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eros nunc lectus nibh non aenean. Bibendum orci convallis ultricies donec vitae sed nunc aliquet. Sollicitudin et at.',
//         name: 'Owati Fiyin'
//       }
//     ]
//   }

//   return (
//     <LayoutView noPadding>
//       <Box pb={{ base: '20px', md: '80px' }} px={{ base: '20px', md: '80px' }}>
//         <Box
//           bg='white' borderRadius={{ base: '12px', md: '24px' }}
//           p={{ base: '15px', md: '60px' }}
//         >
//           <Image w='full' src={data.image} />

//           <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
//             <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{data?.category}</Text>
//             <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{data?.timeToRead}</Text>
//           </HStack>
//           <Text mt='30px' fontSize={{ base: '16px', md: '36px' }} fontWeight='700' noOfLines={1}>{data?.title}</Text>

//           <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
//             <Flex justify={'center'} align={'center'} gap='14px'>
//               <Image h='40px' w='40px' borderRadius='full' src={data?.person} />
//               <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{data?.user}</Text>
//             </Flex>
//             <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{data?.time}</Text>
//           </HStack>

//           <Text mt='30px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{data?.subTitle}</Text>


//           <Text my='34px' fontWeight={'700'} color='#1C1D2C' fontSize={'50px'}>Comments</Text>
//           {data?.comments.map(comment => (
//             <Box>
//               <Flex justify={'flex-start'} align={'center'} gap='14px'>
//                 <Image h='90px' w='90px' borderRadius='full' src={comment?.picture} />
//                 <Text fontWeight={600} fontSize={{ base: '10px', md: '30px' }} color={'#242425'} noOfLines={1}>{comment?.name}</Text>
//               </Flex>
//               <Text textAlign={'right'} maxW={'70%'} ml={'auto'} mt='-20px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{comment?.text}</Text>
//             </Box>
//           ))}
//           <FormTextarea
//             h='200px' w='full'
//             placeholder='Add a comment...'
//             p='40px'
//           />


//           <SimpleGrid mt={{ base: '40px', md: '100px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
//             {extended.map((card, i) => (
//               <HotDropDetail
//                 user={card?.user}
//                 subTitle={card?.subTitle}
//                 onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
//                 time={card?.time}
//                 timeToRead={card?.timeToRead}
//                 category={card?.category}
//                 id={i}
//                 key={i}
//                 image={card?.image}
//                 title={card?.title}
//                 person={card?.person}
//               />
//             ))}
//           </SimpleGrid>
//         </Box>
//       </Box>
//     </LayoutView>
//   )
// }

// export default HotDrops





















import LayoutView from '@/components/layout';
import { Box, Button, Flex, HStack, Image, Input, InputGroup, InputLeftAddon, SimpleGrid, Skeleton, Text, Textarea, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { extended } from '@/constant/hot-drop';
import searchIcon from '@/assets/images/search-icon.png';
import hotDrop from '@/assets/images/hot-drop-main.png';
import HotDropDetail from '@/components/card/HotDropsCardDetails';
import person from '@/assets/images/person/person3.png'
import hotDropImg from '@/assets/images/hot-drop-details.png';
import person1 from '@/assets/images/person/person3.png'
import FormTextarea from '@/components/form/FormTextarea';
import EmptyState from '@/components/empty-state';
import { addComment, fetchForums, getForum } from '@/apis/forum';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import avatar from '@/assets/images/avatar.png'

const HotDrops = () => {
  const toast = useToast()
  const router = useRouter()
  const forumId = router.query.id
  const { data, isError, error, isLoading, refetch, } = useQuery(["getForum", forumId], () => getForum(forumId));
  const { data: forumsData } = useQuery(["fetchForums"], fetchForums);
  const forums = forumsData?.data?.data || []

  const [text, setText] = useState('')

  const forumData = data?.data?.data

  console.log('forums', forums)



  const { isLoading: isCommenting, mutate } = useMutation((data) => {
    // return console.log(data)
    return addComment(forumId, data)
  }, {
    onSuccess: (res) => {
      refetch()
      toast({
        title: "Comment added",
        description: `You have successfully added a comment to this topic`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      toast({
        title: `"Oops...`,
        description: `${err.response?.data?.message || 'Something went wrong, try again'}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    },
  })

  const addNewComment = () => {
    // console.log('text', text)
    mutate({ content: text })
    setText('')
  }

  return (
    <LayoutView noPadding>
      <Box pb={{ base: '20px', md: '80px' }} px={{ base: '20px', md: '80px' }}>
        <Box
          bg='white' borderRadius={{ base: '12px', md: '24px' }}
          p={{ base: '15px', md: '60px' }}
        >
          <Image w='full' src={forumData?.image} />

          <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#1565C0' />}>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.category}</Text>
            <Text fontSize={{ base: '13px', md: '18px' }} color={'#1565C0'} noOfLines={1}>{forumData?.readTime}</Text>
          </HStack>
          <Text mt='30px' fontSize={{ base: '16px', md: '36px' }} fontWeight='700' noOfLines={1}>{forumData?.title}</Text>

          <HStack mt='30px' alignItems={'center'} w={"100%"} spacing={'14px'} divider={<Box w='4px' h='4px' borderRadius={'full'} bg='#4D515E' />}>
            <Flex justify={'center'} align={'center'} gap='14px'>
              <Image h='40px' w='40px' borderRadius='full' src={forumData?.person || avatar.src} />
              <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.creator?.fullname}</Text>
            </Flex>
            <Text fontSize={{ base: '10px', md: '14px' }} color={'#4D515E'} noOfLines={1}>{forumData?.createdAt}</Text>
          </HStack>

          <Text mt='30px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{forumData?.content}</Text>


          <Text my='34px' fontWeight={'700'} color='#1C1D2C' fontSize={'50px'}>Comments</Text>
          {forumData?.comments?.map(comment => (
            <Box>
              <Flex justify={'flex-start'} align={'center'} gap='14px'>
                <Image h='90px' w='90px' borderRadius='full' src={comment?.picture || avatar.src} />
                <Text fontWeight={600} fontSize={{ base: '10px', md: '30px' }} color={'#242425'} noOfLines={1}>{comment?.user?.fullname}</Text>
              </Flex>
              <Text textAlign={'right'} maxW={'70%'} ml={'auto'} mt='-20px' fontSize={{ base: '18px', md: '22px' }} color='#C4C4C4'>{comment?.content}</Text>
            </Box>
          ))}
          <Textarea
            mt='20px'
            fontSize={'18px'}
            h='200px' w='full'
            placeholder='Add a comment...' p='40px'
            onChange={e => setText(e.target?.value)}
            value={text}
          />
          <Button float='right' mt='20px' disabled={isCommenting} isLoading={isCommenting} onClick={addNewComment}>Post</Button>


          <Skeleton isLoaded={!isLoading}>
            <SimpleGrid mt={{ base: '40px', md: '100px' }} columns={{ base: '2', md: '3' }} columnGap={{ base: '10px', md: '26px' }} rowGap={{ base: '15px', md: '56px' }}>
              {forums?.map && forums?.map((card, i) => (
                <HotDropDetail
                  user={card?.creator?.fullname}
                  subTitle={card?.content}
                  onClickCard={() => router.push(`/hot-drop/${card?._id}`)}
                  time={card?.createdAt}
                  timeToRead={card?.readTime}
                  category={card?.category}
                  id={i} key={i}
                  image={card?.image}
                  title={card?.title}
                // person={card?.person}
                />
              ))}
            </SimpleGrid>
            {!forums?.length && (
              <EmptyState text={'No forum article yet'} />
            )}
          </Skeleton>
        </Box>
      </Box>
    </LayoutView>
  )
}

export default HotDrops