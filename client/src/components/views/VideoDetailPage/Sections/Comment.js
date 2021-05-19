import axios from 'axios'
import React, {Fragment, useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const videoId = props.videoId;

    const [CommentText, setCommentText] = useState("");
    const user = useSelector(state => state.user);

    const userCheck = user.userData && !user.userData.isAuth;

    const onSubmit = e => {
        e.preventDefault();

        if(userCheck){
            alert('댓글은 로그인 후 사용할 수 있습니다.');
            return;
        }

        const variables = {
            content: CommentText,
            writer: user.userData._id,
            videoId: videoId
        }

        console.log(user);

        axios.post('/api/comment/saveComment',variables)
            .then(res => {
                if(res.data.success){
                    setCommentText("");
                    props.refreshFunction(res.data.result);
                }else{
                    alert('댓글 입력에 실패했습니다.');
                }
            })
    }

    const handleClick = e => {
        setCommentText(e.currentTarget.value);
    }

    const submitButton = userCheck ||
        <button style={{width:'8%', height:'40px', marginTop: '5px', marginBottom: '10px'
            , border: 'none', borderRadius: '5px', background: '#04B4AE'
            , color: '#fff', fontWeight: '500', fontSize: 'larger', cursor: 'pointer'
        }} onClick={onSubmit}>입력</button>;

    return (
        <div>
            <br/>
            <p>댓글</p>
            <hr />
            {/* Comment Lists */}
            {
                props.commentLists &&
                props.commentLists.map((comment, index) => (
                    (!comment.responseTo &&
                        <Fragment>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={videoId} key={index}/>
                            <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id}  videoId={videoId} refreshFunction={props.refreshFunction}/>
                        </Fragment>
                    )
                ))
                
            }
            

            {/* Root Comment Form */}

            <form style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        marginTop: '5px'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius:'5px', resize: 'none', padding: '10px 15px'}}
                    disabled={userCheck ? true : false}
                    onChange={handleClick}
                    value={CommentText}
                    placeholder={userCheck ? "로그인 후 사용 가능합니다." : "댓글을 입력해주세요."}
                />

                {submitButton}

            </form>
        </div>
    )
}

export default Comment

