import { useNavigate } from "react-router-dom";
import style from './GridItem.module.css';

export default function GridItem({ produto }) {
    const navigate = useNavigate();

    const handleMove = () => {
        navigate(`/movimentar/${produto.id}`, { state: { nome: produto.nome } });
    };

    return (
        <li className={style.item}>
            <span>{produto.nome} - R${produto.preco} - {produto.categoria}</span>
            <button onClick={handleMove}>Movimentar</button>
        </li>
    );
}