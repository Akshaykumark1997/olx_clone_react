import React,{useEffect,useState,useContext} from 'react';
import { FirebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';


import './View.css';
function View() {
  const [useDetails,setUserDeatails] = useState();
  const {postDetails} = useContext(PostContext);
  const {firebase} = useContext(FirebaseContext);
  

  useEffect(()=>{
    const {userId} = postDetails
    console.log(postDetails)
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
      res.forEach(doc => {
        setUserDeatails(doc.data())
      });
    })
  },[firebase, postDetails])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       { useDetails &&
        <div className="contactDetails">
          <p>{useDetails.userName}</p>
          <p>{useDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
