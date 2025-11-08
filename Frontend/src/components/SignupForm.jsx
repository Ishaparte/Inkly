import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import "../style/signup.css";

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      console.log("Starting signup...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user.uid);

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        address: address,
        createdAt: new Date()
      });

      console.log("User data saved to Firestore.");

      alert('Signup successful!');

      if (role === 'seller') {
        navigate('/sell');
      } else {
        navigate('/cart');
      }

    } catch (err) {
      console.error("Signup Error:", err.message);
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Signup</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        required
      />

      <label>Select Role:</label>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
