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
    // const consumerRoutes = ['/category', '/']

    // useEffect(() => {
    //   console.log('router?.pathname', router?.pathname)
    //   if (authState?.user && authState?.user?.role) {
    //     const userRole = authState?.user?.role;
    //     if (userRole === 'consumer') {

    //     }
    //   }
    // }, [router?.pathname])

    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken')
      // if (authState?.isAuthenticated) {
      //   if (authState.user.role === 'creator')
      //     router.push('/store')
      //   else if (authState.user.role === 'creator')
      //     router.push('/')
      //   else if (authState.user.role === 'admin')
      //     router.push('/admin')
      // }
      if (!authState?.isAuthenticated && accessToken) {
        axiosInstance.get("/auth")
          .then(res => {
            authenticateUser(res.data)(authDispatch)
            setChecked(true)
          })
          .catch(err => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            router.push('/auth')
          })
      } else {
        if (!authState.isAuthenticated) {
          router.push('/auth/login')
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
