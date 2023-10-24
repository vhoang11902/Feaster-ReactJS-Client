import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ routes }) => {
  return (
    <Breadcrumb separator=">">
  {routes.map((route, index) => {
    const isLastRoute = index === routes.length - 1;
    if (isLastRoute) {
      return (
        <Breadcrumb.Item key={route.path}>{route.name}</Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item key={route.path}>
        {route.path === '/' ? (
          <Link to="/">Home</Link>
        ) : (
          <Link to={route.path}>{route.name}</Link>
        )}
      </Breadcrumb.Item>
    );
  })}
</Breadcrumb>
  );
};

export default BreadCrumb;