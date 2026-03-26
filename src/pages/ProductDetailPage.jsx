import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { getProducts, getProduct, updateProduct} from "../database/crud";
import StoreAutocomplete from "../components/StoreAutocomplete";

function ProductDetailPage () {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [stores, setStores] = useState([]);
    const debouncedProductDetails = useDebounce(productDetails, 2000);


    useEffect(() => {
        console.log("Updating product with...", debouncedProductDetails);
        if (debouncedProductDetails !== null) {
            notifyPromise(updateDatabase(debouncedProductDetails));
        }
        
    }, [debouncedProductDetails]);

    const notifyPromise = (promise) => toast.promise(
        promise,
        {
            loading: 'Saving...',
            success: <b>Product saved</b>,
            error: <b>Could not save.</b>
        }
    );

    const fetchProduct = async (id) => {
        const result = await getProduct(id);
        setProductDetails(result);
    }

    const fetchStores = async () => {
        const products = await getProducts();
        const stores = [...new Set(products.map(product => product.store))].sort();
        setStores(stores);
    }

    const updateDatabase = async (newProductDetails) => {
        // Update product with new details   
        const result = await updateProduct(id, newProductDetails);
        console.log(result);
        fetchStores();
    }

    const onChange = async (value, field) => {
        // Update product with new field value
        console.log(value, field);
        
        const newProductDetails = {
            ...productDetails,
            [field]: value,
        }

        setProductDetails(newProductDetails);
    }

    const onChangeQuantity = async (newQuantity) => {
        newQuantity = Math.max(newQuantity, 0);

        // Create the updated object
        const newProductDetails = {
            ...productDetails,
            quantity: newQuantity,
        }

        // Apply logic for 'needed' if quantity is 0
        if (newQuantity === 0 && productDetails.automatic_restock > 0) {
            newProductDetails.needed = productDetails.automatic_restock;
        }

        setProductDetails(newProductDetails);
    }
    
    

    useEffect(() => {
        // Fetch product details from database
        fetchProduct(id);

        // Fetch all product for stores list
        fetchStores();
    }, [id])

    if (productDetails === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <Toaster />
            <input 
                type="text" 
                value={productDetails.name} 
                onChange={(e) => {onChange(e.target.value, 'name')}}
            />

            <label>
                Quantity
                <input 
                    type="number" 
                    value={productDetails.quantity} 
                    onChange={(e) => {onChangeQuantity(e.target.value)}}
                />
            </label>

            <label>
                Storage

                <select 
                    name="storage" 
                    onChange={(e) => {onChange(e.target.value, 'storage')}}
                    value={productDetails.storage}
                >
                    <option value="">-</option>
                    <option value="Congelador">Congelador</option>
                    <option value="Nevera">Nevera</option>
                    <option value="Despensa">Despensa</option>
                </select>
            </label>

            <label>
                Needed
                <input 
                    type="number" 
                    value={productDetails.needed} 
                    onChange={(e) => {onChange(e.target.value, 'needed')}}
                />
            </label>

            <label>
                Automatic restock
                <input 
                    type="number" 
                    value={productDetails.automatic_restock} 
                    onChange={(e) => {onChange(e.target.value, 'automatic_restock')}}
                />
            </label>

            <label>
                Expiration date
                <input 
                    type="date" 
                    value={productDetails.expiration_date} 
                    onChange={(e) => {onChange(e.target.value, 'expiration_date')}}
                />
            </label>

            <label>
                Buy date
                <input 
                    type="date" 
                    value={productDetails.buy_date} 
                    onChange={(e) => {onChange(e.target.value, 'buy_date')}}
                />
            </label>

            <StoreAutocomplete
                value={productDetails.store || ""}
                stores={stores}
                onChange={(value) => onChange(value, 'store')}
            />

            <label>
                Note
                <input 
                    type="text" 
                    value={productDetails.note} 
                    onChange={(e) => {onChange(e.target.value, 'note')}}
                />
            </label>
            
        </div>
    )
}

export default ProductDetailPage;