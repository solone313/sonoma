import React, { useEffect,useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NavBar from '../../components/Navbar/Navbar';
import { getUsers } from '../../store/actions/usersActions';
import Layout from '../../layout/Layout';
import Loader from '../../components/Loader/Loader';
import requireAuth from '../../hoc/requireAuth';
import { Table, Input, Select, Button, Row, Col} from 'antd';

import './styles.css';

const { Option } = Select;
const Users = ({ getUsers, users: { users, isLoading } }) => {
  useEffect(() => {
    getUsers();
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      }
    ]
  }
  const columns = [
    {
      title: 'PROVIDER',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'USERNAME',
      dataIndex: 'username',
      key: 'id',
    },   
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'TIME',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
  
  
  const [showNavBar, setShowNavBar] = useState(false);
  return (
    <Layout>
      <div className="users">    
      <div>
          {showNavBar && <NavBar />}
        </div>
      <Row gutter={16}>
        <Row justify="start" style={{ width: '50%' }}> 
          <Input.Group compact>
            <Col>
            <Select defaultValue="Zhejiang">
              <Option value="Zhejiang">Zhejiang</Option>
              <Option value="Jiangsu">Jiangsu</Option>
            </Select>
            <Input
              style={{
                width: '50%',
              }}
              defaultValue="Xihu District, Hangzhou"
            />  
              <Button type="primary">버튼</Button>
            </Col>
          </Input.Group>
        </Row>
        <Row justify="end" style={{ width: '50%' }}>
            <Col>
              <Button type="primary">버튼</Button>
            </Col>
        </Row>
        </Row>
        <h1>회원목록</h1>
        <div className="list">
          {isLoading ? (
            <Loader />
          ) : (
            <>
             <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={users} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default compose(requireAuth, connect(mapStateToProps, { getUsers }))(Users);
