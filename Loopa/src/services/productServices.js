import api from '../services/apiConfig';

export const productServices = {
    
    productList: async (categoryId = null) => {
        try {
          const url = categoryId ? `products/?categoryId=${categoryId}` : 'products/';
          const response = await api.get(url);
          return response.data;
        } catch (error) {
          throw error;
        }
    },
      
    productDetail: async (id) => {
        try{
            const response = await api.get(`products/${id}`);
            return response.data
        } catch(error) {
            throw error;
        }
    },

    categoryId: async () => {
        try{
            const response = await api.get('categories/');
            return response.data
        } catch(error) {
            throw error;
        }
    },

    addProduct: async (title, price, description, categoryId, images) => {
        try{
            const response = await api.post("products/", {
                title,
                price,
                description,
                categoryId,
                images
            });
            return response.data
        } catch(error) {
            throw error;
        }
    }
}