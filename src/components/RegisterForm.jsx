import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {useRegister} from '../api/auth/authHooks';


const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(null);
    const {mutateAsync: createUser, isLoading, error} = useRegister();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        setSubmitError(null);
        setSubmitSuccess(null);
        try {
            const response = await createUser(data);
            setSubmitSuccess(response.message || "Registration successful!");
        } catch (error) {
            setSubmitError(error.response?.data?.message || "Error while creating user");
            console.log(error)
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {submitSuccess && (
                <div className="alert alert-success d-flex align-items-center mb-3" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                <div>{submitSuccess}</div>
                </div>
            )}
            {submitError && (
                <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>{submitError}</div>
                </div>
            )}
            <div className="input-group has-validation mb-3">
                <div className="form-floating is-invalid">
                    <input 
                    type="text" 
                    placeholder='Name'
                    className="form-control is-invalid" 
                    id="name" 
                    {...register('name', {
                        required: 'Name is required',
                    })}
                    />
                    <label className="floatingInputGroup2">Name</label>
                </div>
                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}    
            </div>

             <div className="input-group has-validation mb-3">
                <div className="form-floating is-invalid">
                    <input 
                    type="email" 
                    placeholder='Email'
                    className="form-control is-invalid" 
                    id="email" 
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    />
                    <label className="floatingInputGroup2">Email</label>
                </div>
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}    
            </div>

                <div className='input-group has-validation mb-3'>
                    <div className="form-floating is-invalid">
                        <input 
                        type={showPassword ? ('text') : ('password')}
                        className="form-control is-invalid" 
                        placeholder="Password" 
                        id="password" 
                        {...register('password', {
                            required: 'Password is required'
                        })}
                        />
                        <label className="floatingInputGroup2">Password</label>
                    </div>
                     <button className="input-group-text rounded-end" type='button'onClick={toggleShowPassword}>
                        <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`} />
                     </button> 
                        {errors.password &&  <div className="invalid-feedback">{errors.password.message}</div>}  
                </div>            

            <div className="d-grid mt-4"> 
                <button type="submit" className="btn btn-primary py-2">
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Creating User...
                        </>
                    ) : (
                        'Register'
                    )}
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;