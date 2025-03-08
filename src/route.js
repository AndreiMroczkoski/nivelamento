import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/Grid";
import Sidebar from "./components/Sidebar";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";

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
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1 p.4">

                    <Routes>
                        <Route path="/" element={<Home />} > </Route>
                        <Route path="/Grid" element={<ProductList products={products} />} />
                        <Route path="/CadastroProduto" element={<ProductForm />} />
                        <Route path="/Login" element={<Login />} />
                    </Routes>

                </div>
            </div>
            <Footer />
        </BrowserRouter>
    )
}
