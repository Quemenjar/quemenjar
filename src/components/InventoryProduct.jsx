import { Link } from "react-router-dom"

function InventoryProduct ({productDetails, onChange, onChangeQuantity, onAutomaticRestock, onDelete}) {
    
    return (
        <div>
            <input 
                type="text" 
                value={productDetails.name} 
                onChange={(e) => {onChange(productDetails.id, e.target.value, 'name')}}
            />

            <label>
                Quantity
                <input 
                    type="number" 
                    value={productDetails.quantity} 
                    onChange={(e) => {onChangeQuantity(productDetails.id, e.target.value)}}
                />
            </label>

            <label>
                Storage

                <select 
                    name="storage" 
                    onChange={(e) => {onChange(productDetails.id, e.target.value, 'storage')}}
                    value={productDetails.storage}
                >
                    <option value="">-</option>
                    <option value="Congelador">Congelador</option>
                    <option value="Nevera">Nevera</option>
                    <option value="Despensa">Despensa</option>
                </select>
            </label>

            <label>
                Expiration date
                <input 
                    type="date" 
                    value={productDetails.expiration_date} 
                    onChange={(e) => {onChange(productDetails.id, e.target.value, 'expiration_date')}}
                />
            </label>

            <button onClick={(e) => {onAutomaticRestock(productDetails.id)}}>
                Automatic restock {productDetails.automatic_restock > 0 ? '✅' : '❌'}
            </button>

            <button>
                <Link to={`/product/${productDetails.id}`} >Editar</Link>
            </button>

            <button onClick={() => onDelete(productDetails.id)}>
                Delete
            </button>
        </div>
    )
}

export default InventoryProduct;