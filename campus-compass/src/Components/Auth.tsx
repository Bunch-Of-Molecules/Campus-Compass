import {useState} from "react";

const Auth = ({ setToken }:{setToken: (token:string) => void}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
        const endpoint = isLogin ? 'login' : 'signup';
        const res = await fetch(`http://localhost:3000/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
        } else {
            alert(data.error || data.message);
        }
    };

    return (
        <div className="auth-box">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleAuth}>{isLogin ? 'Login' : 'Signup'}</button>
            <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer' }}>
                {isLogin ? 'Create account' : 'Already have an account?'}
            </p>
        </div>
    );
};

export default Auth;