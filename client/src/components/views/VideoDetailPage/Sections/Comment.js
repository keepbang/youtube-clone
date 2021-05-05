import React,{useState} from 'react'

function Comment() {

    const [CommentText, setCommentText] = useState("");

    const handleClick = e => {
        setCommentText(e.currentTarget.value);
    }

    return (
        <div>
            <br/>
            <p>댓글</p>
            <hr />
            {/* Comment Lists */}

            {/* Root Comment Form */}

            <form style={{display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'}} onSubmit>
                <textarea
                    style={{width: '100%', borderRadius:'5px', resize: 'none', padding: '10px 15px'}}
                    onChange={handleClick}
                    value={CommentText}
                    placeholder="댓글을 입력해주세요."
                />
                
                <button style={{width:'10%', height:'45px', marginTop: '5px'
                    , border: 'none', borderRadius: '5px', background: '#04B4AE'
                    , color: '#fff', fontWeight: '500', fontSize: 'larger', cursor: 'pointer'
                    }} onClick>입력</button>

            </form>
        </div>
    )
}

export default Comment
