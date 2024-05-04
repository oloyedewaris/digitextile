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

export const searchApi = async (query) => {
    const res = await axiosInstance.get(`/search?query=${query}`)
    return (res)
}

export const fetchUserInsight = async () => {
    const res = await axiosInstance.get(`/users/insights`)
    return (res)
}

export const fetchCreatorProfile = async (id) => {
    const res = await axiosInstance.get(`/users/creator/profile/${id}`)
    return (res)
}

export const changeUserPassword = async (data) => {
    const res = await axiosInstance.post(`/users/change-password`, data)
    return (res)
}
