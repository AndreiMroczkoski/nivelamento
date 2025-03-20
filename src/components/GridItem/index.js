import style from './productItem.module.css';


export default function GridItem({ produtos }) {
    return (
        <li className={style.item}>
            <span>{produtos.name} - R${produtos.price} - {produtos.category}  </span>
            <button>Editar</button>
            <button>Excluir</button>
        </li>
    );
}