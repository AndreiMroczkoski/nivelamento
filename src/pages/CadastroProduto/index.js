import { useState } from 'react';
import style from './CadastroProduto.module.css'
import axios from 'axios';

export default function CadastroProduto() {


    const [produtoInformado, setProduto] = useState({
        id: "",
        nome: "",
        preco: "",
        categoria: ""
      });
      
   
      const cadastrarProduto = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:3001/produtos",produtoInformado);
    
          console.log("Produto criado:", response.data);
          alert("Produto cadastrado com sucesso!");
        } catch (error) {
          console.error("Erro ao criar produto:", error);
          alert("Falha ao cadastrar o produto.");
        }
      };

    return (

        <form className={style.cadastro} onSubmit={cadastrarProduto}>
            <input type="text"
            placeholder="Nome do Produto"
            value={produtoInformado.nome}
            onChange={(e) => setProduto({ ...produtoInformado, nome: e.target.value })}
            />
            <input type="number"
            placeholder="Preço" 
            value={produtoInformado.preco}
            onChange={(e) => setProduto({ ...produtoInformado, preco: e.target.value })}
            />
            <input type="text" 
            placeholder="Categoria"
            value={produtoInformado.categoria}
            onChange={(e) => setProduto({ ...produtoInformado, categoria: e.target.value })}
            />
            <button type="submit">Salvar</button>
        </form>
    );
}