import axios from 'axios';
import GridItem from '../GridItem';
import style from './Grid.module.css';
import { useState } from 'react';

export default function Grid() {

    const [produto, setProduto] = useState([]); 

    const buscarProduto = async () => {
        try {

   
            const response = await axios.get('http://localhost:3001/produtos');
            setProduto(response.data); 
        
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            alert("Falha ao buscar produtos.");
        }

    };

    buscarProduto();

    return (
        <ul className={style.list}>
            {
            produto.map(p => (
                <GridItem key={p.id} produto={p} />
            ))}
        </ul>
    );
}
