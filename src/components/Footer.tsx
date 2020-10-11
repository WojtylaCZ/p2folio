import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { login } from '../libs/authentication/login';
import { registration } from '../libs/authentication/registration';

import './App.css';

export const Footer = () => {
  return (
    <div className="content">
      <div className="paper" style={{ paddingTop: '10px' }}>
        <Paper id="footer" square={true} style={{ padding: '5px' }}>
          2019 @ Vojtech Uhlir
          <Link to="/"> Home </Link>
          <Link to="/login"> Login </Link>
          <Link to="/register"> Register </Link>
        </Paper>
      </div>
    </div>
  );
};
