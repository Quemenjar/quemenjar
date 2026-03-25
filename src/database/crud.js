import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    try {
        let products = [];
        
        const result = await axios.get(`${API_URL}/products.json`);
        
        const productsObj = result.data;
        if (productsObj) {
            const productArr = Object.keys(productsObj).map((id) => ({
                id,
                ...productsObj[id],
            }));
            products = productArr;
        }
        
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function addProduct (newProductDetails) {
    try {
        const result = await axios.post(`${API_URL}/products.json`, newProductDetails);
        return result
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function updateProduct(id, newProductDetails) {
    try {
        const result = await axios.patch(`${API_URL}/products/${id}.json`, newProductDetails);
        return result
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function deleteProduct(id) {
    try {
        const result = await axios.delete(`${API_URL}/products/${id}.json`);
        return result;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}