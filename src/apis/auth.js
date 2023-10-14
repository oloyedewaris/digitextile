import axiosInstance from "@/utils/axiosInstance"

export const registerUserApi = async (values) => {
    const res = await axiosInstance.post('/auth/register', values)
    return (res)
}

export const completeRegApi = async (values) => {
    const userID = localStorage.getItem('userId');
    const res = await axiosInstance.post(`/auth/register/profile/${userID}`, values, { headers: { 'Content-Type': 'multipart/form-data' } });
    return (res)
}

export const registerCac = async (values) => {
    const userID = localStorage.getItem('userId');
    const res = await axiosInstance.post(`/auth/register/cac/${userID}`, values, { headers: { 'Content-Type': 'multipart/form-data' } });
    return (res)
}

export const loginUserApi = async (values) => {
    const res = await axiosInstance.post('/auth/login', values)
    return (res)
}

export const verifyEmail = async (token) => {
    const res = await axiosInstance.get(`/auth/verify-email/${token}`)
    return (res)
}

export const resendVerification = async (email) => {
    const res = await axiosInstance.get(`/auth/resend-verification?email=${email}`)
    return (res)
}
export const resetPassword = async (body) => {
    const res = await axiosInstance.post(`/auth/reset-password`, body)
    return (res)
}

export const updatePassword = async (body) => {
    const res = await axiosInstance.patch(`/auth/reset-password/update`, body)
    return (res)
}
