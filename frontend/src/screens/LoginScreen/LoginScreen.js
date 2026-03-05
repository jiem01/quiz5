import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import FormComponent from '../../components/FormComponent/FormComponent';
import Loader from '../../components/Loader/Loader';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <FormComponent title="Sign In" onSubmit={submitHandler}>
      {error && <div className="form-error">{error}</div>}
      {loading && <Loader />}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        Sign In
      </button>
      <div className="form-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </FormComponent>
  );
};

export default LoginScreen;
