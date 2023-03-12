import React, { useEffect } from 'react';
import { getReciepts } from '../../store/actions/receiptsActions';
import { Redirect } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import _ from 'lodash';
import requireAuth from '../../hoc/requireAuth';
import {
  Link,
} from 'react-router-dom';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

const Reciepts = ({ auth, getReciepts, reciepts: { reciepts, isLoading, error }, history }) => {
  useEffect(() => {
    getReciepts();
  }, []);

  if (!auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <Layout>
      <br/><br/><br/>
      <Table dataSource={reciepts}>
        <Column
          title="No"
          dataIndex="id"
          key="id"
          render={(id) => (
            <>
              <Link to={`/reciepts/${id}`}>{id}</Link>
            </>
          )}
        />
        <Column title="생성일" dataIndex="createdAt" key="createdAt" />
        <Column title="거래처명" dataIndex="customerName" key="customerName" />
        <Column title="제품명" dataIndex="productName" key="productName" />
        <Column title="처리 단계" dataIndex="currentProcess" key="currentProcess" />
      </Table>;
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  reciepts: state.reciepts,
});

export default compose(requireAuth, connect(mapStateToProps, { getReciepts }))(Reciepts);
