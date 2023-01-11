import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../Store/Context';
import { SpinnerContext } from '../../Store/SpinnerContext';
import Spinner from '../../Components/Spinner/Spinner';
import './Signup.css';


export default function Signup() {
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext);
  const {spinner,setSpinner} = useContext(SpinnerContext);
  const history = useHistory();
  const handleSubmit = (e) =>{
    setSpinner(true);
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({displayName:userName}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          userName:userName,
          phone:phone
        }).then(()=>{
          setSpinner(false);
          history.push('/login');
        })
      })
    })
  }
  
  return (
    <div>
      {spinner && <Spinner/> }
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' ></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
