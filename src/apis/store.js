import axiosInstance from "@/utils/axiosInstance"

export const createStore = async (data) => {
    const res = await axiosInstance.post(`/stores`, data)
    return (res)
}
export const fetchStore = async () => {
    const res = await axiosInstance.get(`/stores`)
    return (res)
}
export const updateStore = async (id, data) => {
    const res = await axiosInstance.patch(`/stores/${id}`, data)
    return (res)
}
export const fetchStoreProducts = async (id) => {
    const res = await axiosInstance.get(`/stores/product/${id}`)
    return (res)
}
export const updateStoreImages = async (id, data) => {
    const res = await axiosInstance.post(`/stores/images/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}
