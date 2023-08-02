import axiosInstance from "@/utils/axiosInstance"

export const registerUserApi = async (values) => {
    const res = await axiosInstance.post('/auth/register', values)
    return (res)
}

export const completeRegApi = async (values) => {
    const val = { ...values, cacNumber: 123 }
    const userID = localStorage.getItem('userId');
    const res = await axiosInstance.post(`/auth/register/profile/${userID}`, val);
    return (res)
}

export const loginUserApi = async (values) => {
    const res = await axiosInstance.post('/auth/login', values)
    return (res)
}