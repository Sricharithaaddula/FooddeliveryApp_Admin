import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';
import "../../../App.css";



const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Set loading to false initially
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError(""); // clear previous error if any
  
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
  
      const data = await response.json();
      console.log("Registration API Response:", data); // 👈 Add this
      
      if (response.ok) {
        // Success
      } else {
        setError(data.message || "Registration Failed, Contact Admin");
        alert(data.message || "Registration Failed, Contact Admin");
      }
      
  
      // ✅ Registration success
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("Vendor registered successfully!");
      showLoginHandler();
  
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
      alert("Registration failed due to a system error.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="registerSection">
     {loading && 
      <div className="loaderSection">
      <ThreeCircles
        visible={loading}
        height={100}
        width={100}
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p>Hi, Your Registration under process</p>
    </div>
     }
{!loading &&     <form className='authForm' onSubmit={handleSubmit} autoComplete='off'>

<h3>Vendor Register</h3>
<label>Username</label>
<input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='enter your name' /><br />
<label>Email</label>
<input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' /><br />
<label>Password</label>
<input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} name='password' placeholder='enter your password' /><br />
<span className='showPassword'
  onClick={handleShowPassword}
>{showPassword ? 'Hide' : 'Show'}</span>
<div className="btnSubmit">
  <button type='submit'>Submit</button>
</div>
{error && <p className="error">{error}</p>} 
</form>}
  
    </div>
  );
};

export default Register;
