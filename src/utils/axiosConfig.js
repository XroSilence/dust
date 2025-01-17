import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request config if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const sendQuoteEmail = async (quoteData, contactInfo) => {
    try {
        const response = await axiosInstance.post('/api/quote/send', {
            quote: quoteData,
            contact: contactInfo
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to send quote email: ${error.message}`);
    }
};

export const sendContactEmail = async (contactData) => {
    try {
        const response = await axiosInstance.post('/api/contact/send', contactData);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to send contact email: ${error.message}`);
    }
};

export default axiosInstance;