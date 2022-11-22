import React from 'react';
import './CardComponent.css';
import { useNavigate } from 'react-router-dom';


const CardComponent = (props) => {

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    sessionStorage.setItem('user', props.login);
    navigate('/dashboard');
  }

  return (
    <div className='CardComponent'>
      <div className='imageArea'>
        <img src={props.photo} alt="" />
      </div>
      <div className='detailsArea'>
        <h3>Login: {props.login}</h3>
        <h1>Name: {props.name===null ?  'No Name Detected': props.name}</h1>
        <h2>{props.bio===null ? 'No Bio Available' : props.bio}</h2>
        <div className='row'>
          <p>Repositories:{props.repositories}</p>
          <p>Followers:{props.followers}</p>
          <p>Following:{props.following}</p>
        </div>
        <button onClick={handleDetailsClick}>View Profile</button>
      </div>
    </div>
  )
}

export default CardComponent