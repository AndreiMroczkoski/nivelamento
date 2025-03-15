import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProductList from "./components/Grid";
import Sidebar from "./components/Sidebar";
import ProductForm from "./pages/ProductForm";
import Login from "./pages/Login";
import UsuarioLogadoProvider, { UsuarioContext } from "./contexts/Usuario";
import { useContext } from "react";

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

function PrivateRoute({ children }) {
    const usuario = useContext(UsuarioContext);
    if (!usuario["usuario"].logado) {
        return <Navigate to="/login" replace />
    }

    return children;

}


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <UsuarioLogadoProvider>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/*"
                        element={
                            <PrivateRoute>
                                <ProtectedLayout>
                                <Routes>
                                    <Route path="/" element={<Home />} > </Route>
                                    <Route path="/Grid" element={<ProductList products={products} />} />
                                    <Route path="/CadastroProduto" element={<ProductForm />} />
                                </Routes>
                                </ProtectedLayout>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </UsuarioLogadoProvider>
        </BrowserRouter>
    )

    function ProtectedLayout({ children }) {
        return (

            <>
                < Header />
                <div className="d-flex">
                    <Sidebar />
                    <div className="flex-grow-1 p.4">
                    {children}
                    </div>
                </div>
                <Footer />
            </>
        )

    }



}

