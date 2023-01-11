import React, { Fragment,useContext,useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import {FirebaseContext,AuthContext} from '../../Store/Context';
import { SpinnerContext } from '../../Store/SpinnerContext';
import Spinner from '../../Components/Spinner/Spinner';

const Create = () => {
  const {firebase} = useContext(FirebaseContext);
  const {spinner,setSpinner} = useContext(SpinnerContext);
  const {user} = useContext(AuthContext);
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');
  const history = useHistory();
  const date = new Date();
  const handleSubmit = (e) =>{
    e.preventDefault();
    setSpinner(true);
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        setSpinner(false);
        history.push('/');
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        {spinner && <Spinner/>}
        <div className="centerDiv">
          <form >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price} onChange={(e)=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
