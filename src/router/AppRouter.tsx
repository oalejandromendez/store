import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeRoutes } from '../home/routes/HomeRoutes';
import { Login } from '../auth/Login';

export const AppRouter:React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/*" element={ <HomeRoutes />} />
        </Routes>
    </BrowserRouter>
  )
}
