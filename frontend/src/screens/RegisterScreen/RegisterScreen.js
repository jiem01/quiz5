import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';
import FormComponent from '../../components/FormComponent/FormComponent';
import Loader from '../../components/Loader/Loader';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

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
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError('');
    dispatch(register(username, password));
  };

  return (
    <FormComponent title="Create Account" onSubmit={submitHandler}>
      {(error || localError) && (
        <div className="form-error">{localError || error}</div>
      )}
      {loading && <Loader />}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        Register
      </button>
      <div className="form-link">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </FormComponent>
  );
};

export default RegisterScreen;
