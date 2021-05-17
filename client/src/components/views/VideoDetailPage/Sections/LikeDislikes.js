import React,{useEffect, useState} from "react";
import {Tooltip} from 'antd';
import {LikeFilled, DislikeFilled, LikeOutlined, DislikeOutlined} from '@ant-design/icons';
import Axios from "axios";

function LikeDislikes(props) {

    const[Likes, setLikes] = useState(0);
    const[DisLikes, setDisLikes] = useState(0);

    const[LikeAction, setLikeAction] = useState(null);
    const[DisLikeAction, setDisLikeAction] = useState(null);

    let variable = {

    }

    if(props.video){
        variable = {videoId: props.videoId, userId: props.userId}
    }else{
        variable = {commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(res => {
                if(res.data.success){
                    setLikes(res.data.likes.length);
                    res.data.likes.map(like => {
                        if(like.userId === props.userId){
                            setLikeAction('liked');
                        }
                    })
                }else{
                    alert("Likes 정보를 가져오지 못했습니다.")
                }
            })

        Axios.post('/api/like/getDisLikes', variable)
            .then(res => {
                if(res.data.success){
                    setDisLikes(res.data.dislikes.length);
                    res.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId){
                            setDisLikeAction('disliked');
                        }
                    })
                }else{
                    alert("DisLikes 정보를 가져오지 못했습니다.")
                }
            })
    },[])


    return (
        <div>
            <span key="comment-basic-like" style={{marginRight: '8px'}}>
                <Tooltip title="Like">
                    {
                        LikeAction === 'liked'?
                            <LikeFilled onClick/> :
                            <LikeOutlined onClick/>
                    }
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>{Likes}</span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    {
                        DisLikeAction === 'disliked'?
                            <DislikeFilled onClick/> :
                            <DislikeOutlined onClick/>
                    }
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>{DisLikes}</span>
            </span>

        </div>
    )
}

export default LikeDislikes;