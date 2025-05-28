import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    return(
        <div className="position-absolute top-50 start-50 translate-middle" style={{ width: "350px" }}>
            <div className="bg-white p-4 rounded-4 shadow-sm">
                <div className="text-center mb-4"> 
                    <i className="bi bi-person-fill fs-1"></i>
                    <h2 className="mb-2">Create account!</h2>
                </div>
                <RegisterForm/>
                <div className="text-center mt-3">
                    <small className="text-muted d-inline-block">
                        Already have an account?{" "}
                        <span 
                        role="button" 
                        className="link-primary pe-auto"
                        onClick={navigateToLogin}
                        >
                        Login
                        </span>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;