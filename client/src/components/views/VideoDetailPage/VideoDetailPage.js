import React, {useEffect, useState} from 'react';
import {Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislikes from "./Sections/LikeDislikes";
import {useSelector} from "react-redux";

function VideoDetailPage(props) {
    const user = useSelector(state => state.user)

    const videoId = props.match.params.videoId
    const variable = {videoId:videoId};

    const [VideoDetail, setVideoDetail] = useState([]);

    const [Comments, setComments] = useState([]);

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(res => {
                    if(res.data.success){
                        setVideoDetail(res.data.videoDetail);
                    }else{
                        alert('비디오 정보를 가져오지 못했습니다.')
                    }
                })

        Axios.post('/api/comment/getComments', variable)
            .then(res => {
                if(res.data.success) {
                    setComments(res.data.comments);
                }else{
                    alert('댓글 정보를 가져오지 못했습니다.');
                }
            })
    },[])


    const updateComment = (newComent) => {
        setComments(Comments.concat(newComent));
    }

    if(VideoDetail.writer) {


        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>;

        const likesSubscribeArray = (user.userData && !user.userData.isAuth) ||
            [<LikeDislikes video
                           userId={localStorage.getItem('userId')}
                           videoId={videoId}/>, subscribeButton];

        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding: '3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        <List.Item
                            actions={likesSubscribeArray}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>

                        {/* Comments */}
                        <Comment videoId={videoId} commentLists={Comments} refreshFunction={updateComment}/>

                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>

            </Row>
        )
    }else{
        return (
            <div>Loading ...</div>
        )
    }
}

export default VideoDetailPage;