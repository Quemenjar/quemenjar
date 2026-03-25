import { useEffect, useMemo, useState } from "react";
import Filter from "../components/Filter";

import InventoryProduct from "../components/InventoryProduct";
import { Link } from "react-router-dom";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../database/crud";

function InventoryPage () {
    const [productList, setProductList] = useState([]);
    const [activeStorage, setActiveStorage] = useState(null);

    const fetchProducts = async () => {
        const products = await getProducts();
        setProductList(products);
    }

    const displayedProducts = useMemo(() => {
        if (activeStorage !== null) {
            return productList.filter(p => p.storage === activeStorage);
        }
        return productList;
    }, [productList, activeStorage]);

    const onFilter = (value) => {
        console.log(value);
        if (value === "Todo") {
            setActiveStorage(null);
        } else {
            setActiveStorage(value);
        }
    }

    const onAddProduct = async () => {
        const newProductDetails = {
            "name": "",
            "buy_date": "",
            "expiration_date": "",
            "store": "",
            "quantity": 1,
            "needed": 0,
            "automatic_restock": 0,
            "usual": false,
            "note": "",
            "storage": ""
        }
        const result = await addProduct(newProductDetails);
        console.log(result);
        if (result.status === 200) {
            fetchProducts();
        }
    }

    const onChange = async (id, value, field) => {
        // Update product with new field value
        const update = {
            [field]: value
        }

        const result = await updateProduct(id, update);
        if (result.status === 200) {
            fetchProducts();
        }
    }

    const onChangeQuantity = async (id, newQuantity) => {
        console.log(id, newQuantity);
        const product = productList.find(product => product.id === id);
        const update = {
            quantity: Math.max(newQuantity, 0)
        }

        if (update.quantity === 0 && product.automatic_restock > 0) {
            update.needed = product.automatic_restock
        }

        const result = await updateProduct(id, update);
        console.log(result);
        if (result.status === 200) {
            fetchProducts();
        }
    }

    const onDelete = async (id) => {
        // Delete product
        const result = await deleteProduct(id);
        if (result.status === 200) {
            fetchProducts();
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    if (productList === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <Filter options={['Todo', 'Congelador', 'Nevera', 'Despensa']} onFilter={onFilter}/>
            <br />

            <button onClick={onAddProduct}>Add product</button>

            <div>

                { displayedProducts.map((product) => {
                    //if (product.quantity > 0 || product.usual){
                        return (
                            <InventoryProduct 
                                key={product.id}
                                productDetails={product} 
                                onChange={onChange}
                                onChangeQuantity={onChangeQuantity}
                                onDelete={onDelete}
                            />
                        )
                    //}
                }) }
            </div>
        </>
    )
}

export default InventoryPage;