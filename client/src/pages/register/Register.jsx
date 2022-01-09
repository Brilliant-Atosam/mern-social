import './register.css';
import { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef();
  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();
    if (password.current.value !== password2.current.value) {
      password.current.setCustomValidity('Passwords do not match');
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post('http://localhost:3001/auth/register', user);
        history.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Bongosocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <form onSubmit={handleSubmit} className='loginRight'>
          <div className='loginBox'>
            <input
              placeholder='Username'
              type='text'
              ref={username}
              className='loginInput'
              required
            />
            <input
              placeholder='Email'
              type='email'
              ref={email}
              className='loginInput'
              required
            />
            <input
              placeholder='Password'
              type='password'
              ref={password}
              className='loginInput'
              required
            />
            <input
              placeholder='Password Again'
              type='password'
              ref={password2}
              className='loginInput'
              required
            />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <Link to='/login'>
              <button className='loginRegisterButton'>Log into Account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
