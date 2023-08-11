import axiosInstance from "@/utils/axiosInstance"

export const getCategoriesApi = async (params) => {
    const res = await axiosInstance.get(`/categories?page=${params?.page || 1}&limit=${params?.limit || 6}`)
    return (res)
}

export const createCategoryApi = async (data) => {
    const res = await axiosInstance.post(`/categories`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}

export const updateCategoryApi = async (data, id) => {
    const res = await axiosInstance.patch(`/categories/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}

export const deleteCategoryApi = async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}`)
    return (res)
}

export const searchCategory = async (text) => {
    const res = await axiosInstance.get(`/categories/search?query=${text}`)
    return (res)
}

// export const getCategory = async (params) => {
//     const res = await axiosInstance.get(`/categories?page=${params?.page || 1}&limit=${params?.limit || 6}`)
//     return (res)
// }

