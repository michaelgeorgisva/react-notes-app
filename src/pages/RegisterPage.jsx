import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) navigate('/');
  }

  return (
    <>
      <section className="register-page">
        <h2>Ngisi yaa, biar bisa masuk</h2>
        <RegisterInput register={onRegisterHandler} />
        <p>
          Kembali ke <Link to="/">Masuk</Link>
        </p>
      </section>
    </>
  );
}

RegisterPage.propTypes = {};

export default RegisterPage;
