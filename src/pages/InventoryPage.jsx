import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Filter from "../components/Filter";
import InventoryProduct from "../components/InventoryProduct";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../database/crud";
import useDebounce from "../hooks/UseDebounce";

function InventoryPage () {
    const [productList, setProductList] = useState([]);
    const [activeStorage, setActiveStorage] = useState(null);
    const [showOutOfStock, setShowOutOfStock] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const debouncedEditedProduct = useDebounce(editedProduct, 1000);


    useEffect(() => {
        if (debouncedEditedProduct !== null) {
            const id = editedProduct.id;
            delete editedProduct.id;
            notifyPromise(updateDatabase(id, debouncedEditedProduct));
            setEditedProduct(null);
        }
        
    }, [debouncedEditedProduct]);

    const notifyPromise = (promise) => toast.promise(
        promise,
        {
            loading: 'Saving product...',
            success: <b>Product saved</b>,
            error: <b>Could not save.</b>
        }
    );
    
    
    const fetchProducts = async () => {
        const products = await getProducts();
        setProductList(products);
    }
     

    const displayedProducts = useMemo(() => {
        let filteredProducts = []
        if (activeStorage !== null) {
            filteredProducts = productList.filter(p => p.storage === activeStorage);
        } else {
            filteredProducts = productList;
        }
        
        return filteredProducts.filter((product) => {
            return showOutOfStock || product.quantity > 0 || product.automatic_restock > 0;
        })
        
    }, [productList, activeStorage, showOutOfStock]);


    const onFilter = (value) => {
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

        if (result.status === 200) {
            fetchProducts();
        }
    }

    const toggleOutOfStock = () => {
        setShowOutOfStock(!showOutOfStock);
    }

    const updateDatabase = async (id, newProductDetails) => {
        // Update product with new details   
        const result = await updateProduct(id, newProductDetails);
    }

    const onChange = async (id, value, field) => {
        // Update product with new field value
        
        if (editedProduct && editedProduct.id !== id) {
            const oldId = editedProduct.id;
            delete editedProduct.id;
            updateDatabase(oldId, editedProduct);
        }

        const newProductList = productList.map((product) => {
            if (product.id === id) {
                const update = {
                    ...product,
                    [field]: value
                }

                setEditedProduct({...update});
                return update;
            } else {
                return product;
            }
        })

        setProductList(newProductList);
    }

    const onChangeQuantity = async (id, newQuantity) => {
        const product = productList.find(product => product.id === id);
        const update = {
            quantity: Math.max(newQuantity, 0)
        }

        if (update.quantity === 0 && product.automatic_restock > 0) {
            update.needed = product.automatic_restock
        }

        const result = await updateProduct(id, update);
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
            <Toaster />
            <Filter options={['Todo', 'Congelador', 'Nevera', 'Despensa']} onFilter={onFilter}/>
            <button onClick={toggleOutOfStock}>Show out of stock</button>
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