import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Flex } from '@chakra-ui/react';

function LandingAuth(Component) {
  const AuthCheck = () => {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const loggedIn = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');

    useEffect(() => {
      if (loggedIn) {
        router.push(role === 'admin' ? '/admin' : role === 'creator' ? '/store' : '/dashboard')
      } else {
        setChecked(true)
      }
    }, [])

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify='center' align='center' h='100vh' w='100vw'>
            <CircularProgress isIndeterminate size="24px" />
          </Flex>
        )}
      </div>
    )
  }
  return AuthCheck
};


export default LandingAuth
