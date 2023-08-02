import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Flex } from '@chakra-ui/react';
import { GlobalContext } from '@/context/Provider';

function LandingAuth(Component) {
  const AuthCheck = () => {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const { authState } = useContext(GlobalContext)
    const loggedIn = authState.isAuthenticated

    useEffect(() => {
      if (loggedIn) {
        router.push('/dashboard')
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
