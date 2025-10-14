import React from 'react';
import CrudPage from '../components/crud/CrudPage';
import { adminConfig } from '../config/adminConfig';

const AdminsPage = () => {
  return <CrudPage config={adminConfig} />;
};

export default AdminsPage;