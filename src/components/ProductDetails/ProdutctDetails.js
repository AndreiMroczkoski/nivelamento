import style from '.ProductDetails.module.css';

export default function ProductDetails({ product, onClose }) {
    
    if (!product) return null;
    return (
        <div className={style.modal}>
            <h2>{product.name}</h2>
            <p>Preço: R${product.price}</p>
            <p>Categoria: {product.category}</p>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
}