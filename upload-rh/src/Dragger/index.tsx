import React, { useRef, useEffect, useState } from 'react';
import { FunctionComponent, PropsWithChildren, MutableRefObject, RefObject, ReactNode } from 'react';

import { Progress, Card } from 'antd';
import { PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';

import './index.css';

// 组件 props 的类型
export type DraggerProps = PropsWithChildren<{
  name: string;
  action: string;
  onChange: (info: UploadFile) => void;
}>;

// 文件上传的状态
export type UploadFileStatus = 'uploading' | 'done' | 'error';

// 文件包装对象的类型
export interface UploadFile {
  originFileObj: File;
  percent: number;
  status: UploadFileStatus;
  url?: string;
}

// JSX.Element ≈ React.ReactElement
// React.ReactNode 范围比前两者广
const Dragger: FunctionComponent<DraggerProps> = function (props: DraggerProps): JSX.Element {
  const draggerContainer: MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement | undefined>();

  const onDragEnter = function (event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragOver = function (event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDragLeave = function (event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  };
  const onDrop = function (event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const dataTransfer: DataTransfer | null = event.dataTransfer;

    if (dataTransfer && dataTransfer.files) {
      upload(dataTransfer.files);
    }
  };

  const [uploadFiles, setUploadFiles] = useState<Array<UploadFile>>([]);

  const upload = function (files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      const formData: FormData = new FormData();
      formData.append('filename', file.name);
      formData.append(props.name, file);

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open('POST', props.action, true);
      xhr.responseType = 'json';

      const uploadFile: UploadFile = {
        originFileObj: file,
        percent: 0,
        status: 'uploading'
      };
      uploadFiles.push(uploadFile);

      const onUploadProgress = function (event: ProgressEvent): void {
        if (event.lengthComputable) {
          const percent = Math.round(event.loaded / event.total * 100);
          uploadFile.percent = percent;

          if (percent >= 100) {
            uploadFile.status = 'done';
          }

          setUploadFiles([...uploadFiles]);
        }
      };

      xhr.onprogress = onUploadProgress;
      xhr.upload.onprogress = onUploadProgress;

      xhr.onerror = function (): void {
        uploadFile.status = 'error';

        setUploadFiles([...uploadFiles]);
      };

      xhr.onreadystatechange = function (): void {
        if (xhr.readyState === 4 && xhr.status === 200) {
          uploadFile.url = xhr.response.url;

          props.onChange(uploadFile);

          setUploadFiles([...uploadFiles]);
        }
      };

      xhr.send(formData);
    }
  };

  useEffect(() => {
    draggerContainer.current!.addEventListener('dragenter', onDragEnter);
    draggerContainer.current!.addEventListener('dragover', onDragOver);
    draggerContainer.current!.addEventListener('dragleave', onDragLeave);
    draggerContainer.current!.addEventListener('drop', onDrop);

    return () => {
      draggerContainer.current!.removeEventListener('dragenter', onDragEnter);
      draggerContainer.current!.removeEventListener('dragover', onDragOver);
      draggerContainer.current!.removeEventListener('dragleave', onDragLeave);
      draggerContainer.current!.removeEventListener('drop', onDrop);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        className="dragger-container"
        ref={draggerContainer as RefObject<HTMLDivElement>}
      >
        {props.children}
      </div>
      {
        uploadFiles.map((item: UploadFile, index: number): JSX.Element => {
          return (
            <div key={index}>
              <div>
                {item.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />}
                <span style={{ marginLeft: '10px' }}>{item.originFileObj.name}</span>
              </div>
              <Progress
                status={item.status === 'error' ? 'exception' : undefined}
                percent={item.percent}
              />
            </div>
          );
        })
      }
      {
        uploadFiles.map((item: UploadFile, index: number): ReactNode => {
          return item.url ? (
            <Card
              key={index}
              hoverable
              style={{ width: 240 }}
              cover={<img alt={item.originFileObj.name} src={item.url} />}
            >
              <Card.Meta title={item.originFileObj.name} />
            </Card>
          ) : null;
        })
      }
    </React.Fragment>
  );
};

export default Dragger;
