import axios from 'axios'
import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment';

function Comment(props) {

    const videoId = props.videoId;

    const [CommentText, setCommentText] = useState("");
    const user = useSelector(state => state.user)


    const onSubmit = e => {
        e.preventDefault();

        const variables = {
            content: CommentText,
            writer: user.userData._id,
            videoId: videoId
        }

        axios.post('/api/comment/saveComment',variables)
            .then(res => {
                if(res.data.success){
                    setCommentText("");
                    props.refreshFunc(res.data.result);
                }else{
                    alert('댓글 입력에 실패했습니다.');
                }
            })
    }

    const handleClick = e => {
        setCommentText(e.currentTarget.value);
    }

    return (
        <div>
            <br/>
            <p>댓글</p>
            <hr />
            {/* Comment Lists */}
            {
                props.commentLists &&
                props.commentLists.map((comment, index) => (
                    <SingleComment comment={comment} videoId={videoId}/>
                ))
                
            }
            

            {/* Root Comment Form */}

            <form style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius:'5px', resize: 'none', padding: '10px 15px'}}
                    onChange={handleClick}
                    value={CommentText}
                    placeholder="댓글을 입력해주세요."
                />
                
                <button style={{width:'8%', height:'40px', marginTop: '5px', marginBottom: '10px'
                    , border: 'none', borderRadius: '5px', background: '#04B4AE'
                    , color: '#fff', fontWeight: '500', fontSize: 'larger', cursor: 'pointer'
                    }} onClick={onSubmit}>입력</button>

            </form>
        </div>
    )
}

export default Comment
