import { Product } from '../alkkis.types'
import React from "react"

interface ProductsListProps {
    selected: Product[],
    products: Product[],
    toggleSelected: (product?: Product) => void
}

function ProductsList({
    selected, products, toggleSelected
}: ProductsListProps) {

    function handleSelection(event: React.ChangeEvent<HTMLInputElement>) {
        toggleSelected(products.find((p: Product) => p.num == parseInt(event.target.value)))
    }

    return (
        <ul>
            {products.map((product: Product) => <li key={product.num}>
                <a href={product.alkoLink} target="_blank" rel="noopener noreferrer">
                    {product.name}
                </a>
                {product.alcoholPercentage} - {product.price}
                <input type="checkbox" value={product.num} checked={selected.includes(product)} onChange={handleSelection} />
            </li>
            )}
        </ul>
    )
}

export default ProductsList