import React, {useRef, useState} from 'react';
import {useIntl, FormattedMessage} from 'umi';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {roleList,addRole} from "@/services/mogan/api";
import {ModalForm, ProFormText, ProFormTextArea} from "@ant-design/pro-form";

const RoleList = () => {

  const actionRef = useRef();
  const [createModalVisible, handleModalVisible] = useState(false);
  const intl = useIntl();
  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      await addRole({ ...fields });
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
          id="pages.roleList.roleName"
          defaultMessage="Rol Adı"
        />
      ),
      dataIndex: 'name',
      render: (dom) => {
        return (
          <a
            onClick={() => {
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
          id="pages.roleList.options"
          defaultMessage="Role Options"
        />
      ),
      dataIndex: 'description',
      render: (dom) => {
        return (
          <a
            onClick={() => {

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
          id: 'pages.roleList.title',
          defaultMessage: 'Rol Listesi',
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
        request={roleList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log(`setSelectedRows${selectedRows}`);
          },
        }}
      />
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.roleList.createForm.newRole',
          defaultMessage: 'Yeni Rol',
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
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.roleList.roleName.required"
                  defaultMessage="Rol adı zorunludur"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
    </PageContainer>
  );
};


export default RoleList;
