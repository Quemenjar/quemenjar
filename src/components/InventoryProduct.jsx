import { Link } from "react-router-dom";

function InventoryProduct({ productDetails, onChange, onChangeQuantity, onAutomaticRestock, onDelete }) {

    return (
        <div className="inventory-list-product">
            <div className="product-left">
                <input
                    className="product-title"
                    type="text"
                    placeholder="Nombre del producto"
                    value={productDetails.name}
                    onChange={(e) => { onChange(productDetails.id, e.target.value, 'name') }}
                />

                <label>
                    <input
                        className="product-quantity"
                        type="number"
                        value={productDetails.quantity}
                        onChange={(e) => { onChangeQuantity(productDetails.id, e.target.value) }}
                    />
                </label>
            </div>

            <div className="product-middle">
                <label>

                    <select className="product-select"
                        name="storage"
                        onChange={(e) => { onChange(productDetails.id, e.target.value, 'storage') }}
                        value={productDetails.storage}
                    >
                        <option value="">-</option>
                        <option value="Congelador">Congelador</option>
                        <option value="Nevera">Nevera</option>
                        <option value="Despensa">Despensa</option>
                    </select>
                </label>

                <label>
                    <input
                        className="expiration-date"
                        type="date"
                        value={productDetails.expiration_date}
                        onChange={(e) => { onChange(productDetails.id, e.target.value, 'expiration_date') }}
                    />
                </label>
            </div>

            <div className="product-right">
                <button 
                    className={`${productDetails.automatic_restock > 0 ? 'purchased-button' : ''}`} 
                    onClick={(e) => { onAutomaticRestock(productDetails.id) }}
                >
                    Auto agregar 🛒+
                </button>

                <button>
                    <Link to={`/product/${productDetails.id}`} >Editar</Link>
                </button>

                <button onClick={() => onDelete(productDetails.id)}>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default InventoryProduct;