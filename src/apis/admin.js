import axiosInstance from "@/utils/axiosInstance"

export const getAllUsersApi = async () => {
    const res = await axiosInstance.get('/admin/users')
    return (res)
}

export const getUserApi = async (id) => {
    const res = await axiosInstance.get(`/admin/users/${id}`)
    return (res)
}

export const toggleActiveStateApi = async (id) => {
    const res = await axiosInstance.patch(`/admin/users/${id}/active`)
    return (res)
}

export const approveCreatorApi = async (id) => {
    const res = await axiosInstance.patch(`/admin/users/${id}/approval`)
    return (res)
}