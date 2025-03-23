import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import UsuarioLogadoProvider, { UsuarioContext } from "./contexts/Usuario";
import { useContext } from "react";
import Grid from "./components/Grid";
import CadastroProduto from "./pages/CadastroProduto";
import MovimentarProduto from "./pages/MovimentarProduto";


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
                                    <Route path="/Grid" element={<Grid/>} />
                                    <Route path="/CadastroProduto" element={<CadastroProduto />} />
                                    <Route path="/MovimentarProduto/:id" element={<MovimentarProduto />} />
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

