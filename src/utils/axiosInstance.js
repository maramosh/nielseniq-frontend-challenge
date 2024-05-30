import axios from 'axios';
import { AppContext } from './appContext';
import { useContext } from 'react';


const useAxios = () => {

	const { setErrorLoading } = useContext(AppContext);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            setErrorLoading(false);
            return response.data;
        },
        async () => {
            setErrorLoading(true);
        }
    );

    return axiosInstance;
}

export default useAxios;
