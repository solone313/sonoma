import React, { useEffect } from 'react';
import { getReciept } from '../../store/actions/receiptActions';
import { Redirect } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import _ from 'lodash';
import requireAuth from '../../hoc/requireAuth';
import { Table, Descriptions, Steps, List, Divider, Card, Col, Row } from 'antd';
const { Column, ColumnGroup } = Table;

const Reciept = ({ auth, getReciept, reciept: { reciept, isLoading, error }, history, match }) => {
  const matchID = match.params.id;

  useEffect(() => {
    getReciept(matchID, history);
  }, [matchID]);

  if (!auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <Layout>
      <Divider/>
      <Descriptions title={`${reciept.id}`} bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
        <Descriptions.Item label="고객명">{reciept.customerName}</Descriptions.Item>
        <Descriptions.Item label="연락처">{reciept.contact}</Descriptions.Item>
        <Descriptions.Item label="담당자">{reciept.manager}</Descriptions.Item>
        <Descriptions.Item label="납기일">{reciept.productName}</Descriptions.Item>
        <Descriptions.Item label="바코드">
          <img src={`https://bwipjs-api.metafloor.com/?bcid=code128&text=${reciept.barcode}&scale=2&includetext&backgroundcolor=ffffff`} />
        </Descriptions.Item>
        <Descriptions.Item label="제품명">{reciept.productName}</Descriptions.Item>
        <Descriptions.Item label="규격">{reciept.standard}</Descriptions.Item>
        <Descriptions.Item label="절수">{reciept.bowNumber}</Descriptions.Item>
        <Descriptions.Item label="페이지">197</Descriptions.Item>
        <Descriptions.Item label="수량">{reciept.quantity}</Descriptions.Item>
        <Descriptions.Item label="제본">{reciept.bindingMethod}</Descriptions.Item>
        <Descriptions.Item label="귀도리">{reciept.gwidori}</Descriptions.Item>
        <Descriptions.Item label="시오리">{reciept.ribbon}</Descriptions.Item>
        <Descriptions.Item label="금장">{reciept.gildEdge}</Descriptions.Item>
        <Descriptions.Item label="포장">{reciept.shrinkWrap}</Descriptions.Item>
        <Descriptions.Item label="C/T">{reciept.ct}</Descriptions.Item>
        <Descriptions.Item label="내지구성">
          <List
            itemLayout="horizontal"
            dataSource={reciept.composition}
            renderItem={(item, index) => (
              <List.Item>
                <Descriptions bordered>
                  <Descriptions.Item label="내용">{item.description}</Descriptions.Item>
                  <Descriptions.Item label="용지">{item.paper}</Descriptions.Item>
                  <Descriptions.Item label="페이지">{item.page}</Descriptions.Item>
                  <Descriptions.Item label="비고">{item.memo}</Descriptions.Item>
                </Descriptions>
              </List.Item>
            )}
          />
        </Descriptions.Item>
        <Descriptions.Item label="공정 상태" span={3}>
          <Steps
            progressDot
            current={reciept.currentProcess}
            direction="vertical"
            items={reciept.processType?.map((message, index) => {
              return {
                title: message,
              };
            })}
          />
        </Descriptions.Item>
      </Descriptions>
      <Divider/>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="중요메모" bordered={false}>
            {reciept.memo1}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="주문메모" bordered={false}>
            {reciept.memo2}
          </Card>
        </Col>
      </Row>
      <Divider/>
    </Layout>
  );
};

function mapStateToProps(state) {
	return {
    auth: state.auth,
    reciept: state.reciept, 
  };
}


export default compose(requireAuth, connect(mapStateToProps, { getReciept }))(Reciept);
