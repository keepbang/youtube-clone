import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {Comment, Avatar, Button, Input} from 'antd'
import axios from "axios";

const {TextArea} = Input;


function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentText, setCommentText] = useState("");

    const user = useSelector(state => state.user)

    const onHandleChange = e => {
        setCommentText(e.currentTarget.value);
    }

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
        if(!OpenReply){
            setCommentText("");
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        const variables = {
            content: CommentText,
            writer: user.userData._id,
            videoId: props.videoId,
            responseTo: props.comment._id
        }

        axios.post('/api/comment/saveComment',variables)
            .then(res => {
                if(res.data.success){
                    setCommentText("");
                    setOpenReply(!OpenReply);
                    props.refreshFunction(res.data.result);
                }else{
                    alert('댓글 입력에 실패했습니다.');
                }
            })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image"/>}
                content={<p>{props.comment.content}</p>}
            />
            {
                OpenReply &&
                <form style={{display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'}} onSubmit={onSubmit}>
                    <TextArea
                        style={{width: '100%', borderRadius:'5px', resize: 'none', padding: '10px 15px'}}
                        onChange={onHandleChange}
                        value={CommentText}
                        placeholder="댓글을 입력해주세요."
                    />
                    
                    <button style={{width:'8%', height:'40px', marginTop: '5px', marginBottom: '10px'
                        , border: 'none', borderRadius: '5px', background: '#04B4AE'
                        , color: '#fff', fontWeight: '500', fontSize: 'larger', cursor: 'pointer'
                        }} onClick={onSubmit}>입력</button>

                </form>
            }
            
        </div>
    )
}

export default SingleComment
