import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        if (!identifier || !password) {
            setError('Email/ Username and Password are required.');
            setIsLoading(false);
            return;
        }

        const loginData = {
            username: identifier,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8081/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            const responseData = response.json;

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successfull', responseData);

                auth.login({ username: responseData.username /* or from token */ }, "LOGGED_IN_DUMMY" /*responseData.token*/);

                const from = location.state?.from?.pathname || "/dashboard";
                navigate(from, { replace: true });
            } else {
                setError(responseData.error || responseData.message || `Login failed: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Login API call failed:', err);
            setError('An error occurred during login. Please try again later.');
        } finally {
            setIsLoading(false);
        }



    };



    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="identifier">Email or Username</label>
                    <input
                        type="text" // Could be 'email' if you only allow email login initially
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                {/* Success message usually not needed on login, but could be added */}

                <button type="submit" disabled={isLoading} className="auth-button">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="auth-switch">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginPage