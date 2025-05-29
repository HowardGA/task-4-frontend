import React from 'react';
import { useLogout } from '../api/auth/authHooks';
import {useAuth} from '../context/AuthContenxt'

const Navbar = () => {
    const {mutate:logout, isLoading} = useLogout();
    const { user } = useAuth();

    const handleLogout = () => {
        logout()
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">The App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                       <li className="nav-item">
                        {
                            user && (user.name)
                        }
                       </li>
                    </ul>
                    <div className="d-flex"> 
                        <button className="btn btn-danger" type="button" onClick={handleLogout}>
                            {isLoading ? (
                                <>
                                    <span 
                                        className="spinner-border spinner-border-sm me-2" 
                                        role="status" 
                                        aria-hidden="true"
                                    ></span>
                                    Logging out...
                                </>
                            ) : (
                                'Logout'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;