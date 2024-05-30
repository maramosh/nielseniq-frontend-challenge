import { useCallback } from "react";
import useAxios from "../utils/axiosInstance";

export function useGetPhotos() {
    const axiosInstance = useAxios();
    const fetchReq = useCallback(
        async () => {
            try {
                const response = await axiosInstance.get('/photos');
                return response.slice(0, 25);
            } catch (e) {
                console.error('Error -->', e);
                return [];
            }
        },
        [],
    );
    return fetchReq;
}