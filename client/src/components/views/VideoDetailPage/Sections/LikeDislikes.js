import React from "react";
import {Tooltip} from 'antd';
import {LikeFilled, DislikeFilled} from '@ant-design/icons';

function LikeDislikes() {
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeFilled
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>1</span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <DislikeFilled
                        onClick
                    />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor:'auto'}}>1</span>
            </span>

        </div>
    )
}

export default LikeDislikes;