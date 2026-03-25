import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct } from "../database/crud";
import StoreList from "../components/StoreList";
import ShoppingListProduct from "../components/ShoppingListProduct";

function ShoppingListPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [selectedStore, setSelectedStore] = useState("");

    // Cargar todos los productos de Firebase al montar
    useEffect(() => {
        getProducts()
            .then((products) => {
                setAllProducts(products);
            })
            .catch((error) => {
                console.error("Error cargando productos:", error);
            });
    }, []);

    // Productos con needed > 0 
    const neededProducts = allProducts.filter((product) => {
        return Number(product.needed) > 0;
    });

    // Tiendas dinámicas: extraer de TODOS los productos, sin repetir, sin vacíos
    const dynamicStores = [
        ...new Set(
            allProducts
                .map((product) => (product.store || "").trim())
                .filter((store) => store !== "" && store !== "Otros")
        ),
    ].sort();

    // Filtrar productos según la tienda seleccionada
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

    // Actualizar un campo de un producto
    const handleUpdateProduct = (id, field, value) => {
        const selectedProduct = allProducts.find((product) => product.id === id);
        if (!selectedProduct) return;

        const updatedData = { [field]: value };

        updateProduct(id, updatedData)
            .then((result) => {
                if (result.status === 200) {
                    const updatedProducts = allProducts.map((product) => {
                        if (product.id === id) {
                            return { ...product, ...updatedData };
                        }
                        return product;
                    });
                    setAllProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.error("Error actualizando producto:", error);
            });
    };

    // Marcar como comprado
    const handleMarkAsPurchased = (id) => {
        const product = allProducts.find((p) => p.id === id);
        if (!product) return;

        const currentQuantity = Number(product.quantity) || 0;
        const currentNeeded = Number(product.needed) || 0;
        const newQuantity = currentQuantity + currentNeeded;

        const today = new Date().toISOString().split("T")[0];

        const updatedData = {
            quantity: newQuantity,       // number (tipo original)
            needed: String(0),           // string (tipo original)
            buy_date: today,
            expiration_date: "",
        };

        updateProduct(id, updatedData)
            .then((result) => {
                if (result.status === 200) {
                    const updatedProducts = allProducts.map((product) => {
                        if (product.id === id) {
                            return { ...product, ...updatedData };
                        }
                        return product;
                    });
                    setAllProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.error("Error marcando como comprado:", error);
            });
    };

    // Quitar de la lista 
    const handleRemoveFromList = (id) => {
        const updatedData = { needed: String(0) };

        updateProduct(id, updatedData)
            .then((result) => {
                if (result.status === 200) {
                    const updatedProducts = allProducts.map((product) => {
                        if (product.id === id) {
                            return { ...product, ...updatedData };
                        }
                        return product;
                    });
                    setAllProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.error("Error eliminando de la lista:", error);
            });
    };

    // Añadir producto nuevo (fila vacía con needed = 1)
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