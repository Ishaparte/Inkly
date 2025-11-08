import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from "react-icons/gi";
import "../style/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error.message);
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleHamburgerClick = () => {
    const menu = document.querySelector('.nav-hamburger-content');
    menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
  };

  return (
    <div className="navbar playfair-display">
      <img className="logo" src="../src/assets/logo_f.png" alt="Logo" />

      <div className="nav-a">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contactus">Contact US</Link>
        {(userRole === "seller" || userRole === "admin") && <Link to="/sell">Sell</Link>}
        <Link to="/about">About</Link>

        {!user && (
          <>
            <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="nav-btn" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}

        {user && (
          <>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
            <img className="profile-icon" src="user.png" alt="Profile" />
          </>
        )}

        <div className="nav-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search books..." />
        </div>
      </div>

        
          <GiHamburgerMenu onClick={handleHamburgerClick} className="hamburger-icon" />
           <div className="nav-hamburger-content">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/contactus">Contact US</Link>
        {(userRole === "seller" || userRole === "admin") && <Link to="/sell">Sell</Link>}
        <Link to="/about">About</Link>

        {!user && (
          <>
            <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="nav-btn" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}

        {user && (
          <>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
           
          </>
        )}

        <div className="nav-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search books..." />
        </div>
      </div>
      

    </div>
  );
};

export default Navbar;
