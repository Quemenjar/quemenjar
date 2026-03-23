import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage () {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    const onChange = (value, field) => {
        // Update field with new value
        const newProductDetails = { ...productDetails};
        newProductDetails[field] = value;
        
        axios.patch(`https://quemenjar-c737b-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`, newProductDetails)
        .then((result) => {
            if (result.status === 200) {
                setProductDetails(newProductDetails);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        // Fetch product details from database
        axios.get(`https://quemenjar-c737b-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`)
        .then((result) => {
            setProductDetails(result.data);
        }).catch((error) => {
            console.log(error);
        })

    }, [id])

    if (productDetails === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            
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
                    onChange={(e) => {onChange(e.target.value, 'quantity')}}
                />
            </label>

            <label>
                Storage
                <input 
                    type="text" 
                    value={productDetails.storage} 
                    onChange={(e) => {onChange(e.target.value, 'storage')}}
                />
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

            <label>
                Store
                <input 
                    type="text" 
                    value={productDetails.store} 
                    onChange={(e) => {onChange(e.target.value, 'store')}}
                />
            </label>

            <label>
                Usual
                <input 
                    type="checkbox" 
                    value={productDetails.usual} 
                    onChange={(e) => {onChange(e.target.value, 'usual')}}
                />
            </label>

            <label>
                Restock
                <input 
                    type="checkbox" 
                    value={productDetails.restock} 
                    onChange={(e) => {onChange(e.target.value, 'restock')}}
                />
            </label>

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