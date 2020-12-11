import React, { ReactChild } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import './index.css';

const DefaultLayout = ({ children }: { children: ReactChild }) => {
  return (
    <div className="omnious-homepage-wrapper">
      <Helmet>
        <title>OMNIOUS HOMEPAGE TOYPROJECT</title>
      </Helmet>
      <Header />
      {children}
    </div>
  );
};

export default DefaultLayout;
