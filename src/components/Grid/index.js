import style from './productList.module.css';
import ProductItem from '../GridItem';


export default function ProductList({ products }) {
    return (
        <ul className={style.list}>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </ul>
    );
}