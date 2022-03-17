/**
 * 
 */
const logger = (error, info) => {

    const {NODE_ENV, DEBUG} = process.env
    
    if(DEBUG) {
        console.log(error, '===>', info)
    }

    if(NODE_ENV === 'production') {
        //errortrackException
    }

};

export default logger;