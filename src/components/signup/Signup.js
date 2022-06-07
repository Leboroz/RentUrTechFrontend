import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserToAPI } from '../../redux/user/user';
import style from './signup.module.scss';

const Signup = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUserToAPI(user));
    setUser({
      username: '',
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className={style['form-group']}>
          <span htmlFor="name">
            Name
          </span>
          <input type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="username">
            Username
          </span>
          <input type="text" id="username" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="email">
            Email
          </span>
          <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="password">
            Password
          </span>
          <input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        </div>
        <input type="submit" value="Signup" />
      </form>
    </div>
  );
};

export default Signup;
