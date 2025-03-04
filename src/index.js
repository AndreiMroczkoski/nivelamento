import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar/Sidebar'; //Importação estranha <-----
import ProductList from './components/ProductList/ProductList';

const products = [
  {
    id: 1,
    name: "Produto 1",
    price: 29.99,
    category: "Categoria A",
  },
  {
    id: 2,
    name: "Produto 2",
    price: 49.99,
    category: "Categoria B",
  },
  {
    id: 3,
    name: "Produto 3",
    price: 19.99,
    category: "Categoria C",
  },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Sidebar/>
    <ProductList products={products} />
    <Footer />
  </React.StrictMode>
);


