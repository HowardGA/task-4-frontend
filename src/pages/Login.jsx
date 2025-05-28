import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContenxt";


const Login = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/admin', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);


    const navigateToRegister = () => {
        navigate('/register');
    }

    return(
        <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "350px" }}>
            <div className="bg-white p-4 rounded-4 shadow-sm">
                <div className="text-center mb-4"> 
                    <i className="bi bi-box-arrow-in-right fs-1"></i>
                    <h2 className="mb-2">Welcome!</h2>
                    <p className="text-secondary m-0">Sign in to your account</p>
                </div>

                <LoginForm/>

                 <div className="text-center mt-3">
                <small className="text-muted d-inline-block">
                    Don't have an account?{" "}
                    <span 
                    role="button" 
                    className="link-primary pe-auto"
                    onClick={navigateToRegister}
                    >
                    Create one
                    </span>
                </small>
            </div>
            </div>
        </div>
    );
};

export default Login;