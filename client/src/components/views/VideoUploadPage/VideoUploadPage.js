import React from 'react';
import {Typography, Button, From, message, Input, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";

import Dropzone from "react-dropzone";

function VideoUploadPage(){
    return(
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:"center", marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/*  Drop zone  */}

                    <Dropzone
                        onDrop
                        multiple
                        maxSize
                    >
                        {({getRootProps, getInputProps}) => (
                            <div style={{display:'flex', width:'300px', height:'240px', border:'1px solid lightgray',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                <input {...getInputProps()}/>

                                <PlusOutlined style={{fontSize:'3rem'}}></PlusOutlined>
                            </div>
                        )}
                    </Dropzone>

                    {/*  Thumbnail  */}
                    <div>
                        <img src alt/>
                    </div>
                </div>

                <br/>
                <br/>

                <label>Title</label>
                <Input
                    onChange
                    value
                />

                <br/>
                <br/>

                <label>Description</label>
                <TextArea
                    onChange
                    value
                />

                <br/>
                <br/>

                <select onChange>
                    <option></option>
                </select>

                <br/>
                <br/>

                <select onChange>
                    <option></option>
                </select>

                <br/>
                <br/>

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default VideoUploadPage