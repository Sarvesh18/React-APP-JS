// TODO: For detail

import { useState, useEffect } from 'react';

const useTest = (props) => {

    const [ isTest, setTest] = useState(null);

    useEffect(() => {
        //subscribe

        //return () => {
            //unsubscribe
        //}
    })

    return isTest ? 'Test Available' :  'Test Unavailable';

} 

//const isOnline useFriendStatus