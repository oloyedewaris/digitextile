import axiosInstance from "@/utils/axiosInstance"

export const createConversation = async (data) => {
    const res = await axiosInstance.post(`/conversations`, data)
    return (res)
}
export const getUserConversations = async () => {
    const res = await axiosInstance.get(`/conversations`)
    return (res)
}
export const getConversation = async (conversationId) => {
    const res = await axiosInstance.get(`/conversations/${conversationId}`)
    return (res)
}
export const checkConversation = async (receipientId) => {
    const res = await axiosInstance.get(`/conversations/check/${receipientId}`)
    return (res)
}
export const sendMessage = async (conversationId, data) => {
    const res = await axiosInstance.post(`/messages/${conversationId}`, data)
    return (res)
}
export const fetchMessages = async (conversationId) => {
    const res = await axiosInstance.get(`/messages/${conversationId}`)
    return (res)
}