import axiosInstance from "@/utils/axiosInstance"

export const createReviewApi = async (values) => {
    const res = await axiosInstance.post('/reviews', values)
    return (res)
}

export const fetchCreatorReview = async (id) => {
    const res = await axiosInstance.get(`/reviews/${id}`)
    return (res)
}

export const fetchUserReview = async () => {
    const res = await axiosInstance.get(`/reviews/user`)
    return (res)
}

export const getReviewRequest = async (id) => {
    const res = await axiosInstance.post(`/conversations/creator/request-review?conversationId=${id}`)
    return (res)
}

export const getProductReview = async (id) => {
    const res = await axiosInstance.get(`/reviews/product/${id}`)
    return (res)
}
