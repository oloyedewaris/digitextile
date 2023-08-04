import axiosInstance from "@/utils/axiosInstance"

export const getProductsApi = async (params) => {
    const res = await axiosInstance.get(`/products?page=${params?.page || 1}&limit=${params?.limit || 10}`)
    return (res)
}

export const getCategorysApi = async (params) => {
    const res = await axiosInstance.get(`/products?page=${params?.page || 1}&limit=${params?.limit || 10}&category=${params.category}`)
    return (res)
}


export const getProductApi = async (id) => {
    const res = await axiosInstance.get(`/products/${id}`)
    return (res)
}

export const getUserProductsApi = async (id) => {
    const res = await axiosInstance.get(`/products/user`)
    return (res)
}

export const updateProductApi = async (id, data) => {
    const res = await axiosInstance.patch(`/products/user/${id}`, data)
    return (res)
}

export const attachImageToProduct = async (id, data) => {
    const res = await axiosInstance.post(`/products/images/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    return (res)
}

export const createProductApi = async (data) => {
    const res = await axiosInstance.post(`/products`, data)
    return (res)
}

export const getCategoriesApi = async (params) => {
    const res = await axiosInstance.get(`/categories?page=${params?.page || 1}&limit=${params?.limit || 6}`)
    return (res)
}


// export const getCategory = async (params) => {
//     const res = await axiosInstance.get(`/categories?page=${params?.page || 1}&limit=${params?.limit || 6}`)
//     return (res)
// }


export const searchCategory = async (text) => {
    const res = await axiosInstance.get(`/categories/search?query=${text}`)
    return (res)
}

export const deleteProductApi = async (id, data) => {
    const res = await axiosInstance.delete(`/products/user/${id}`, data)
    return (res)
}
