import style from './productForm.module.css';

export default function ProductForm() {
    return (
        <form className={style.form}>
            <input type="text" placeholder="Nome do Produto" />
            <input type="number" placeholder="Preço" />
            <input type="text" placeholder="Categoria" />
            <button type="submit">Salvar</button>
        </form>
    );
}