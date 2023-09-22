import axiosInstance from "@/utils/axiosInstance"

export const createReview = async (values) => {
    const res = await axiosInstance.post('/users/reviews', values)
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
