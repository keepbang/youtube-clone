import React, {Fragment, useEffect, useState} from 'react';
import SingleComment from "./SingleComment";

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber++;
            }
        })

        setChildCommentNumber(commentNumber);
    },[props.commentLists, props.parentCommentId])

    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (

            <Fragment>
                {console.log(comment)}
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} key={index}/>
                        <ReplyComment commentLists={props.commentLists} videoId={props.videoId} parentCommentId={comment._id} refreshFunction={props.refreshFunction}/>
                    </div>
                }
            </Fragment>
        ))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {
                ChildCommentNumber > 0 &&
                <p style={{fontSize: '14px',margin: 0, color: 'gray', cursor:'pointer'}} onClick={onHandleChange}>
                    {
                        OpenReplyComments ?
                        `Hide ${ChildCommentNumber} more comment(s)` :
                        `View ${ChildCommentNumber} more comment(s)`
                    }

                </p>
            }
            {
                OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment;