import React, {Fragment, useEffect, useState} from 'react';
import Axios from "axios";
import {EyeOutlined} from "@ant-design/icons";


function SideVideo() {

    const [SideVideos, setSideVideos] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(res => {
                if(res.data.success){
                    setSideVideos(res.data.videos);
                }else{
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    },[]);

    const renderSideVideo = SideVideos.map((sideVideo, index) => {

        let minutes = Math.floor(sideVideo.duration / 60);
        let seconds = Math.floor((sideVideo.duration - minutes * 60));

        return <div style={{display: 'flex', marginBottom: '1rem', padding: '0 2rem'}} key={index}>
            <div style={{width: '40%', marginBottom: '1rem', marginRight:'1rem'}}>
                <a href={`/video/${sideVideo._id}`}>
                    <img style={{width: '100%', height: '100%'}} src={`http://localhost:5000/${sideVideo.thumbnail}`}
                         alt="thumbnail"/>
                </a>
            </div>
            <div style={{width: '50%'}}>
                <a href={`/video/${sideVideo._id}`} style={{color:'gray'}}>
                    <span style={{fontSize: '1rem', color: 'black'}}>{sideVideo.title}</span><br/>
                    <span>{sideVideo.writer.name}</span><br/>
                    <span><EyeOutlined /> {sideVideo.views}</span><br/>
                    <span>{minutes} : {seconds}</span><br/>
                </a>
            </div>
        </div>
    })

    return (
        <Fragment>
            <div style={{marginTop: '3rem'}}/>
            {renderSideVideo}
        </Fragment>
    );
}

export default SideVideo;