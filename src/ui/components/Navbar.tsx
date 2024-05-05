import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const onLogout = () => {
        sessionStorage.clear();
        navigate('/index', {
            replace: true
        });
    }

    const isAuth = sessionStorage.getItem('token');

    return (
        
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Home
            </Link>

            {
                isAuth && <div className="navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <NavLink 
                            className="nav-item nav-link" 
                            to="/users">
                            Usuarios
                        </NavLink>
                        <NavLink 
                            className="nav-item nav-link" 
                            to="/products">
                            Productos
                        </NavLink>
                    </ul>
                </div>
            }

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    { !isAuth ? <NavLink 
                        className="nav-item nav-link active" 
                        to="/login">
                        Login
                    </NavLink> :
                    <button
                        className="nav-item nav-link btn"
                        onClick={ onLogout }
                    >
                        Logout
                    </button>
                    }
                </ul>
            </div>

        </nav>
    )
}