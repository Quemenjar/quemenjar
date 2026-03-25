import { useEffect, useState } from "react";
import StoreList from "../components/StoreList";
import axios from "axios";
import ShoppingListProduct from "../components/ShoppingListProduct";

function ShoppingListPage() {
    const usedStores = ["Mercadona", "Lidl", "Alcampo", "Bonpreu"];
    const [selectedStore, setSelectedStore] = useState("");
    const [products, setProducts] = useState([]);

    const updateProduct = (id, field, value) => {
        const selectedProduct = products.find((product) => {
            return product.id === id;
        });

        if (!selectedProduct) return;

        const updatedProduct = { ...selectedProduct, [field]: value };

        axios
            .patch(
                `https://quemenjar-c737b-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
                updatedProduct
            )
            .then((result) => {
                if (result.status === 200) {
                    const updatedProducts = products.map((product) => {
                        if (product.id === id) return updatedProduct;
                        return product;
                    });

                    setProducts(updatedProducts);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get("https://quemenjar-c737b-default-rtdb.europe-west1.firebasedatabase.app/products.json")
            .then((result) => {
                if (result.data) {
                    const productsArray = Object.keys(result.data).map((id) => {
                        return { id: id, ...result.data[id] };
                    });

                    const neededProducts = productsArray.filter((product) => {
                        return Number(product.needed) > 0;
                    });

                    setProducts(neededProducts);
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const filteredProducts = products.filter((product) => {
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

    return (
        <div>
            <h2>Lista de la compra General</h2>

            <label>Tienda o supermercado</label>
            <StoreList
                usedStores={usedStores}
                selectedStore={selectedStore}
                onSelectStore={setSelectedStore}
            />

            <h2>Productos</h2>

            <div>
                {filteredProducts.map((product) => {
                    return (
                        <ShoppingListProduct
                            key={product.id}
                            product={product}
                            usedStores={usedStores}
                            onUpdateProduct={updateProduct}
                            products={products}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShoppingListPage;