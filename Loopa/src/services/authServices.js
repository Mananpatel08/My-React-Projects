import api from '../services/apiConfig';

export const authServices = {
    login: async (email, password) => {
        try{
            const response = await api.post("auth/login", {
                email,
                password
            });
            if (response.data.access_token){
                localStorage.setItem("token", response.data.access_token)
            }
            return response.data
        } catch(error) {
            throw error;
        }
    },
    register: async (name, email, password) => {
        try{
            const response = await api.post("users/", {
                name,
                email,
                password,
                avatar: "https://i.pravatar.cc/300",
            });
            return response.data
        } catch(error) {
            throw error;
        }
    },

}