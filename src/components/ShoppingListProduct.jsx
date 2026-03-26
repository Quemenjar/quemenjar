import { useNavigate } from "react-router-dom";
import StoreAutocomplete from "./StoreAutocomplete";

function ShoppingListProduct({
    product,
    stores,
    onUpdateProduct,
    onMarkAsPurchased,
    onRemoveFromList,
}) {

    const navigate = useNavigate();

    return (
        <div className="shopping-list-product">

            <div className="product-left">
                <input 
                    className="product-title"
                    type="text"
                    value={product.name || ""}
                    onChange={(e) => {
                        onUpdateProduct(product.id, "name", e.target.value);
                    }}
                    placeholder="Nombre del producto"
                />

                <input
                    className="product-quantity"
                    type="number"
                    value={product.needed || ""}
                    onChange={(e) => {
                        onUpdateProduct(product.id, "needed", e.target.value);
                    }}
                    min="0"
                />
            </div>

            <div className="product-middle">
                <StoreAutocomplete
                    value={product.store || ""}
                    stores={stores}
                    onChange={(value) => {
                        onUpdateProduct(product.id, "store", value);
                    }}
                />

                <input
                    className="product-note"
                    type="text"
                    value={product.note || ""}
                    onChange={(e) => {
                        onUpdateProduct(product.id, "note", e.target.value);
                    }}
                    placeholder="Nota"
                />
            </div>
            
            <div className="product-right">
                <button className="purchased-button" onClick={() => onMarkAsPurchased(product.id)}>
                    Comprado
                </button>

                <button onClick={() => navigate(`/product/${product.id}`)}>
                    Editar
                </button>

                <button onClick={() => onRemoveFromList(product.id)}>
                    Quitar
                </button>
            </div>
        </div>
    );
}

export default ShoppingListProduct;