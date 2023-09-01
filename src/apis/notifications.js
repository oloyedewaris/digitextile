import axiosInstance from "@/utils/axiosInstance"

export const readNotification = async (notificationId) => {
    const res = await axiosInstance.patch(`/notifications/${notificationId}`)
    return (res)
}

export const fetchUserNotifications = async () => {
    const res = await axiosInstance.get(`/notifications`)
    return (res)
}