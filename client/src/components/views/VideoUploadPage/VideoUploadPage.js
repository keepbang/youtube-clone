import React,{useState} from 'react';
import {Typography, Button, From, message, Input, Form} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import Axios from "axios";

import Dropzone from "react-dropzone";

const PrivateSelector = [
    {value : 0, label : "Private"},
    {value : 1, label : "Public"}
];

const CategorySelector = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"}
]


function VideoUploadPage(){

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) =>{
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0]);

        Axios.post('/api/video/uploaded',formData, config)
            .then(response =>{
                if(response.data.success){
                    console.log(response);

                    let variable = {
                        url: response.data.url,
                        fileName : response.data.fileName
                    }

                    Axios.post('/api/video/thumbnail', variable)
                        .then(res => {
                            if(res.data.success){
                                console.log(res);
                            }else{
                                alert('썸네일 생성에 실패 했습니다.');
                            }
                        })
                }else{
                    alert('비디오 업로드를 실패했습니다.')
                }
            })

    }

    return(
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:"center", marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/*  Drop zone  */}

                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={3000000000}
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
                        <img/>
                    </div>
                </div>

                <br/>
                <br/>

                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />

                <br/>
                <br/>

                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />

                <br/>
                <br/>

                <select onChange={onPrivateChange}>
                    {
                        PrivateSelector.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>

                <br/>
                <br/>

                <select onChange={onCategoryChange}>
                    {
                        CategorySelector.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
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