import axiosInstance from "@/utils/axiosInstance"

export const updateUserProfileApi = async (values) => {
    const res = await axiosInstance.post('/users/profile', values)
    return (res)
}

export const updateUserProfileImageApi = async (values) => {
    const res = await axiosInstance.post('/users/profile/images', values, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}

export const getUserProductApi = async (params) => {
    const res = await axiosInstance.get(`/products/user?page=${params?.page || 1}&limit=${params?.limit || 10}`)
    return (res)
}