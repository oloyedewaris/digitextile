import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '../context/Provider'
import axiosInstance from '../utils/axiosInstance';
import { authenticateUser } from '../context/actions/auth';
import { CircularProgress, Flex } from '@chakra-ui/react';

function Auth(Component) {
  const AuthCheck = () => {
    const router = useRouter()
    const [checked, setChecked] = useState(false)
    const { authState, authDispatch } = useContext(GlobalContext)

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken')
      if (!authState?.isAuthenticated && accessToken) {
        axiosInstance.get("/auth/authenticate")
          .then(res => {
            authenticateUser(res.data)(authDispatch)
            setChecked(true)
          })
          .catch(err => {
            localStorage.removeItem('accessToken')
            router.push('/auth/login')
          })
      } else {
        if (!authState.isAuthenticated) {
          router.push('/auth/login')
        } else if (authState.isAuthenticated && authState.user.isPatient && !authState.user?.bioData) {
          router.push('/auth/biodata')
        } else if (authState.isAuthenticated && authState.user.isPatient && !authState.user?.nextOfKin) {
          router.push('/auth/next-of-kin')
        } else {
          setChecked(true)
        }
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


export default Auth
