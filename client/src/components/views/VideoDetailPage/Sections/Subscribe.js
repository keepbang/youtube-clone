import React, {Fragment, useEffect, useState} from 'react';
import {HeartFilled} from '@ant-design/icons';
import Axios from "axios";

function Subscribe(props) {

    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [IsSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {

        let subscribedVariable = {
            userTo: userTo,
            userFrom: userFrom
        }

        Axios.post('/api/subscribe/subscribeNumber', subscribedVariable)
            .then(res => {
               if(res.data.success){
                   console.log(res.data);
                    setSubscribeNumber(res.data.subscribeNumber);
               }else{
                   alert('구독자 수 정보를 받아오지 못했습니다.');
               }
            });



        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setIsSubscribed(res.data.isSubscribed);
                }else{
                    alert('구독정보를 받아오지 못했습니다.');
                }
            })


    },[])

    const onSubscribe = () => {
        let subscribedVariable = {
            userTo: userTo,
            userFrom: userFrom
        }

        if(IsSubscribed){ //구독 취소
            Axios.post('/api/subscribe/unSubscribe',subscribedVariable)
                .then(res => {
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber-1);
                        setIsSubscribed(!IsSubscribed);
                    }else{
                        alert('구독 취소가 실패했습니다.');
                    }
                })
        }else{//구독
            Axios.post('/api/subscribe/subscribe',subscribedVariable)
                .then(res => {
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber+1);
                        setIsSubscribed(!IsSubscribed);
                    }else{
                        alert('구독 실패했습니다.');
                    }
                })
        }

    }

    return (
        <div>
            <button
                style={{
                    backgroundColor: `${IsSubscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                    color: '#fff', padding: '10px 16px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer'
                }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {IsSubscribed ? <HeartFilled style={{color: "red"}} /> : <HeartFilled />}
            </button>
        </div>
    )
}

export default Subscribe;