import { useState, useEffect } from 'react';

const useFriendStatus = (props) => {

    const [ isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        //subscribe

        //return () => {
            //unsubscribe
        //}
    })

    return isOnline ? 'Online' :  'Offine';

} 

//const isOnline useFriendStatus