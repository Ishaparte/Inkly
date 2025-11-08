import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import "../style/login.css"

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userRole = docSnap.data().role;

        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'seller') {
          navigate('/sell');
        } else {
          navigate('/cart');
        }
      } else {
        alert('User role not found');
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
   <form onSubmit={handleLogin} className="login-form">
  <h2>Login</h2>
  <input
    type="email"
    placeholder="Your Email"
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Your Password"
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button type="submit">Login</button>
</form>

  );
};

export default LoginForm;
