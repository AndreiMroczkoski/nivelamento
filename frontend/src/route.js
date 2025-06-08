import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Grid from "./components/Grid";
import CadastroProduto from "./pages/CadastroProduto";
import MovimentarProduto from "./pages/MovimentarProduto";
import ListaMovimentacoes from "./pages/ListaMovimentacoes";
import CadastroUsuario from "./pages/CadastroUsuario";
import ListaUsuarios from "./pages/ListaUsuarios";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import UsuarioProvider from "./contexts/Usuario";


function PrivateRoute({ children }) {
    const token = useSelector(state => state.auth.token);
    return token ? children : <Navigate to="/login" replace />;
}


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <UsuarioProvider>
                    <Routes>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/*"
                            element={
                                <PrivateRoute>
                                    <ProtectedLayout>
                                        <Routes>
                                            <Route path="/" element={<Home />} > </Route>
                                            <Route path="/Grid" element={<Grid />} />
                                            <Route path="/CadastroProduto" element={<CadastroProduto />} />
                                            <Route path="/CadastroUsuario" element={<CadastroUsuario />} />
                                            <Route path="/MovimentarProduto/:id" element={<MovimentarProduto />} />
                                            <Route path="/ListaMovimentacoes" element={<ListaMovimentacoes />} />
                                            <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
                                        </Routes>
                                    </ProtectedLayout>
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </UsuarioProvider>
            </Provider>
        </BrowserRouter>
    )

    function ProtectedLayout({ children }) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header />
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <Sidebar />
                    <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem' }}>
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
