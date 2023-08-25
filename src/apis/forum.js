import axiosInstance from "@/utils/axiosInstance"

export const createForum = async (data) => {
    const res = await axiosInstance.post(`/forums`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}

export const fetchForums = async (params) => {
    const res = await axiosInstance.get(`/forums?page=${params?.page || 1}&limit=${params?.limit || 10}`)
    return (res)
}

export const addComment = async (id, data) => {
    const res = await axiosInstance.post(`/forums/${id}/comment`, data)
    return (res)
}

export const getForum = async (id) => {
    const res = await axiosInstance.get(`/forums/${id}`)
    return (res)
}

export const deleteForum = async (id) => {
    const res = await axiosInstance.delete(`/forums/${id}`)
    return (res)
}

