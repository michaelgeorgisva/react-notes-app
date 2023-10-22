import React from 'react';
import PropTypes from 'prop-types';
import { login } from '../utils/network-data';
import LoginInput from '../components/LoginInput';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ loginSuccess }) {
  const navigate = useNavigate();

  async function onLoginHandler({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <>
      <section className="login-page">
        <h2>Yuk Login</h2>
        <LoginInput login={onLoginHandler} />
        <p>
          Belum punya akun ? <Link to="/register"> Daftar di sini</Link>
        </p>
      </section>
    </>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
