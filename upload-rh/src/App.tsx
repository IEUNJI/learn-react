import React from 'react';

import 'antd/dist/antd.css';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger, { DraggerProps, UploadFile } from './Dragger';
// import { DraggerProps } from './Dragger';
// const { Dragger } = Upload;

const props: DraggerProps = {
  name: 'file',
  action: 'http://localhost:8080/upload',
  onChange: (info: UploadFile) => {
    if (info.status === 'done') {
      message.success(`${info.originFileObj.name} file uploaded successfully.`);
    } else if (info.status === 'error') {
      message.error(`${info.originFileObj.name} file upload failed.`);
    }
  }
};

function App() {

  return (
    <React.Fragment>
      <Dragger {...props}>
        <InboxOutlined />
      </Dragger>
    </React.Fragment>
  );
}

export default App;
