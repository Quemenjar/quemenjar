import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getProducts, addProduct, updateProduct } from "../database/crud";
import useDebounce from "../hooks/UseDebounce";
import StoreList from "../components/StoreList";
import ShoppingListProduct from "../components/ShoppingListProduct";

function ShoppingListPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");
    const [editedProduct, setEditedProduct] = useState(null);
    const debouncedEditedProduct = useDebounce(editedProduct, 1000);

    useEffect(() => {
        getProducts()
            .then((products) => {
                setAllProducts(products);
            })
            .catch((error) => {
                console.error("Error cargando productos:", error);
            });
    }, []);

    useEffect(() => {
        if (debouncedEditedProduct !== null) {
            const id = debouncedEditedProduct.id;
            const { id: _, ...dataToUpdate } = debouncedEditedProduct;
            notifyPromise(updateProduct(id, dataToUpdate));
            setEditedProduct(null);
        }
    }, [debouncedEditedProduct]);

    const notifyPromise = (promise) => toast.promise(
        promise,
        {
            loading: "Saving product...",
            success: <b>Product saved</b>,
            error: <b>Could not save.</b>,
        }
    );

    const neededProducts = allProducts.filter((product) => {
        return Number(product.needed) > 0;
    });

    const dynamicStores = [
        ...new Set(
            allProducts
                .map((product) => (product.store || "").trim())
                .filter((store) => store !== "" && store !== "Otros")
        ),
    ].sort();

    const filteredProducts = neededProducts.filter((product) => {
        const store = (product.store || "").trim();
        const selected = (selectedStore || "").trim();

        if (selected === "" || selected === "Todas") {
            return true;
        }

        if (selected === "Otros") {
            return store === "Otros" || store === "";
        }

        return store === selected || store === "";
    });

    const handleUpdateProduct = (id, field, value) => {
        if (editedProduct && editedProduct.id !== id) {
            const { id: oldId, ...oldData } = editedProduct;
            updateProduct(oldId, oldData);
        }

        const updatedProducts = allProducts.map((product) => {
            if (product.id === id) {
                const update = { ...product, [field]: value };
                setEditedProduct({ ...update });
                return update;
            }
            return product;
        });

        setAllProducts(updatedProducts);
    };

    const handleMarkAsPurchased = (id) => {
        const product = allProducts.find((p) => p.id === id);
        if (!product) return;

        const currentQuantity = Number(product.quantity) || 0;
        const currentNeeded = Number(product.needed) || 0;
        const newQuantity = currentQuantity + currentNeeded;

        const today = new Date().toISOString().split("T")[0];

        const updatedData = {
            quantity: newQuantity,
            needed: String(0),
            buy_date: today,
            expiration_date: "",
        };

        notifyPromise(updateProduct(id, updatedData))
            .then(() => {
                const updatedProducts = allProducts.map((product) => {
                    if (product.id === id) {
                        return { ...product, ...updatedData };
                    }
                    return product;
                });
                setAllProducts(updatedProducts);
            })
            .catch((error) => {
                console.error("Error marcando como comprado:", error);
            });
    };

    const handleRemoveFromList = (id) => {
        const updatedData = { needed: String(0) };

        notifyPromise(updateProduct(id, updatedData))
            .then(() => {
                const updatedProducts = allProducts.map((product) => {
                    if (product.id === id) {
                        return { ...product, ...updatedData };
                    }
                    return product;
                });
                setAllProducts(updatedProducts);
            })
            .catch((error) => {
                console.error("Error eliminando de la lista:", error);
            });
    };

    const handleAddProduct = () => {
        const newProductDetails = {
            name: "",
            needed: String(1),
            quantity: 0,
            note: "",
            store: "",
            automatic_restock: 0,
            buy_date: "",
            expiration_date: "",
            storage: "",
            usual: false,
        };

        addProduct(newProductDetails)
            .then((result) => {
                if (result.status === 200) {
                    const newId = result.data.name;
                    const newProduct = { id: newId, ...newProductDetails };
                    setAllProducts([...allProducts, newProduct]);
                }
            })
            .catch((error) => {
                console.error("Error añadiendo producto:", error);
            });
    };

    return (
        <div>
            <Toaster />
            <h2>Lista de la compra General</h2>

            <label>Tienda o supermercado</label>
            <StoreList
                stores={dynamicStores}
                selectedStore={selectedStore}
                onSelectStore={setSelectedStore}
            />

            <button onClick={handleAddProduct}>Añadir producto</button>

            <h2>Productos</h2>

            <div>
                {filteredProducts.map((product) => {
                    return (
                        <ShoppingListProduct
                            key={product.id}
                            product={product}
                            stores={dynamicStores}
                            onUpdateProduct={handleUpdateProduct}
                            onMarkAsPurchased={handleMarkAsPurchased}
                            onRemoveFromList={handleRemoveFromList}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShoppingListPage;