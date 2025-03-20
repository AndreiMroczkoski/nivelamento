import { useState, useEffect } from 'react';
import axios from 'axios';
import style from './productList.module.css';

export default function Grid() {

    const [produto, setProduto] = useState([]); 
   

    useEffect(() => {
       
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
    }, []);


    return (
        <ul className={style.list}>
            {produto.map(produtos => (
                <Grid key={produtos.id} product={produtos} />
            ))}
        </ul>
    );
}
