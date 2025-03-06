import style from './productItem.module.css';

export default function ProductItem({ product }) {
    return (
        <li className={style.item}>
            <span>{product.name} - R${product.price}</span>
            <button>Editar</button>
            <button>Excluir</button>
        </li>
    );
}