import React,{useEffect, useState} from 'react'
import {Card, Avatar, Col, Row, Typography} from "antd";
import Axios from "axios";
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage() {

    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(res => {
                if(res.data.success){
                    setVideos(res.data.videos);
                }else{
                    alert('비디오 가져오기를 실패했습니다.')
                }
            })
    },[]);

    const renderCards = Videos.map((video, index) => {

        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));



        return <Col lg={6} md={8} xs={24} key={index}>
            <a href={`/video/${video._id}`}>
                <div style={{position: 'relative'}}>
                    <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`}
                         alt="thumbnail"/>
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
            <br/>
            <Meta
                avatar={
                    <Avatar src={video.writer.image}/>
                }
                title={video.title}
                description={video.description}
                style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                }}
            />
            <span>{video.writer.name}</span><br/>
            <span
                style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createAt).format("MMM Do YY")}</span>
        </Col>
    });

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2}>Recommended</Title>
            <hr />
            {
                Videos.length !== 0?
                <Row gutter={[32,16]}>
                    {renderCards}
                </Row>
                :<div style={{ fontSize: '2rem', textAlign:'center' }}>Let's Video Upload!</div>
            }

        </div>
    )
}

export default LandingPage
