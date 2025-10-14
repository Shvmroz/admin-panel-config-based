import React from 'react';
import CrudPage from '../components/crud/CrudPage';
import { userConfig } from '../config/userConfig';

const UsersPage = () => {
  return <CrudPage config={userConfig} />;
};

export default UsersPage;