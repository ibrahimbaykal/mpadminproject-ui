import React, {useRef, useState} from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, message, Form, Input, Drawer} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {userList, addUser} from "@/services/mogan/api";
import {ModalForm} from "@ant-design/pro-form";
import ProDescriptions from "@ant-design/pro-descriptions";

const UserList = () => {

  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [authList, setAuthList] = useState();
  const intl = useIntl();

  function setAuthListFunc(entity) {
    const listItems = entity.authorities.map((authority) =>
      <li label="Authority" valueType="text" key={authority.id}>
        {authority.name}
      </li>
    );
    setAuthList(listItems);
  }

  const handleAdd = async (fields) => {
    console.log(fields);
    const hide = message.loading('正在添加');

    try {
      await addUser({...fields});
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.userList.userName"
          defaultMessage="Kullanıcı Adı"
        />
      ),
      dataIndex: 'username',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setAuthListFunc(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.userList.email"
          defaultMessage="Kullanıcı Email"
        />
      ),
      dataIndex: 'email',
      render: (dom) => {
        return (
          <a
            onClick={() => {
              console.log("test")
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.userList.unit"
          defaultMessage="User"
        />
      ),
      dataIndex: 'birim',
      tip: 'Müşteri birimini ifade eder',
      render: (dom) => {
        return (
          <a
            onClick={() => {
              console.log("test")
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.userList.options"
          defaultMessage="User"
        />
      ),
      dataIndex: 'name',
      render: (dom) => {
        return (
          <a
            onClick={() => {
              console.log("test")
            }}
          >
            {dom}
          </a>
        );
      },
    }
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.userList.title',
          defaultMessage: 'Hizmet Listesi',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
          </Button>,
        ]}
        request={userList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log(`setSelectedRows${selectedRows}`);
          },
        }}
      />
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.userList.createForm.newUser',
          defaultMessage: 'Yeni Kullanıcı',
        })}
        width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <Form.Item
          name="username"
          label="Kullanıcı Adı"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="password"
          label="Şifre"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
      </ModalForm>
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {console.log(currentRow)}
        {currentRow?.username && (
          <ProDescriptions
            column={2}
            title={currentRow?.firstName + " " +currentRow?.lastName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
        {currentRow?.authorities.length > 0 && (
          <ProDescriptions

            column={2}
            title="Kullanıcı Rolleri"
            request={async () => ({
              data: currentRow || {},
            })}
            // columns={detailColumns}
          >
            <ProDescriptions.Item valueType="text">
              <ul>
                {authList}
              </ul>
            </ProDescriptions.Item>
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};


export default UserList;
