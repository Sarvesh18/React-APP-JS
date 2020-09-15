import React from 'react';
import { Error } from '@components';

/**
 * @see 
 */
class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            error,
            isError: true
        };
    }

    componentDidCatch(error, info) {
        //logStackToService
        console.log('error===>', error, info);
    }

    render() {
        const { isError } = this.state;
        
        if(isError) {
            return (
                <Error />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
