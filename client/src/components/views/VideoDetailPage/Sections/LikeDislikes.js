import React,{useEffect} from "react";
import {Tooltip} from 'antd';
import {LikeFilled, DislikeFilled} from '@ant-design/icons';
import Axios from "axios";

function LikeDislikes(props) {

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

                }else{
                    alert("Likes 정보를 가져오지 못했습니다.")
                }
            })
    },[])


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeFilled style={{color:""}}
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>1</span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <DislikeFilled style={{color:"red"}}
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>1</span>
            </span>

        </div>
    )
}

export default LikeDislikes;