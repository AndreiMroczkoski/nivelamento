import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/Grid";

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

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} > </Route>
                <Route path="/Grid" element={<ProductList products={products} />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
