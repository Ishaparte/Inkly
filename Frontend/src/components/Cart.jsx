import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import "../style/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Get current user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load cart items
  const fetchCartItems = async () => {
    try {
      if (!userId) return;
      const cartRef = collection(db, 'cart');
      const q = query(cartRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };

  // Update total price whenever cart changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Fetch cart when userId is ready
  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  // Delete item
  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, 'cart', itemId));
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  // Change quantity
  const handleQuantityChange = async (itemId, quantity) => {
    try {
      await updateDoc(doc(db, 'cart', itemId), { quantity });
      setCartItems(prev => 
        prev.map(item => item.id === itemId ? { ...item, quantity } : item)
      );
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  // Load Google Pay script
  useEffect(() => {
    const scriptId = "google-pay-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://pay.google.com/gp/p/js/pay.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  // Checkout with Google Pay
  const handleCheckout = () => {
    if (!window.google || !window.google.payments || !window.google.payments.api) {
      alert("Google Pay is still loading. Please wait a moment and try again.");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', // Mock gateway for testing
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      }],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Hackathon Bookstore',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: totalPrice.toFixed(2),
        currencyCode: 'INR',
        countryCode: 'IN',
      },
    };

    paymentsClient.loadPaymentData(paymentRequest)
      .then(paymentData => {
        console.log("Payment successful:", paymentData);
        alert("Payment successful 🎉");
        // Optionally clear cart and save order
      })
      .catch(err => {
        console.error("Payment failed:", err);
        alert("Payment cancelled or failed");
      });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <label >
                  Quantity:
                  <select className='options-q'
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(q => (
                      <option  key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </label>
                <button className='remove-btn' onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout} className="checkout-btn">Pay with Google Pay</button>
        </>
      )}
    </div>
  );
};

export default Cart;
