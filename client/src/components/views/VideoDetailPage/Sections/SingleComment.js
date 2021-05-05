import React, {useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd'

const {TextArea} = Input;

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onHandleChange = e => {
        setCommentValue(e.currentTarget.value);
    }


    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
        if(!OpenReply){
            setCommentValue("");
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        // const variables = {
        //     content: CommentText,
        //     writer: user.userData._id,
        //     videoId: props.videoId,
        //     responseTo: 
        // }

        // axios.post('/api/comment/saveComment',variables)
        //     .then(res => {
        //         if(res.data.success){
        //             console.log(res.data.result);
        //             setCommentText("");
        //         }else{
        //             alert('댓글 입력에 실패했습니다.');
        //         }
        //     })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt={props.comment.writer.name}/>}
                content={<p>{props.comment.content}</p>}
            />
            {
                OpenReply &&
                <form style={{display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width: '100%', borderRadius:'5px', resize: 'none', padding: '10px 15px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
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
