import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { ProductList } from '../components/ProductList';
import { ProductDetail } from '../components/ProductDetail';
import ProtectedRoute, { ProtectedRouteProps } from '../../admin/routes/PrivateRoute';
import { Products } from '../../admin/components/products/Products';
import { Users } from '../../admin/components/users/Users';

export const HomeRoutes: React.FC = () => {

    const isAuth = sessionStorage.getItem('token');

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'component'> = {
        isAuthenticated: isAuth ? true : false,
        authenticationPath: '/login',
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="index" element={<ProductList/>} />

                    <Route path="product/:id" element={<ProductDetail />} />

                    <Route path="/" element={<Navigate to="/index" />} />

                    <Route path='products' element={<ProtectedRoute {...defaultProtectedRouteProps} component={<Products />} />} />

                    <Route path='users' element={<ProtectedRoute {...defaultProtectedRouteProps} component={<Users />} />} />
                </Routes>
            </div>
        </>
    )
}