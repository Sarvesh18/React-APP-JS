import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, Radio, Spinner } from '@components';

import './Home.css';
import { getLaunchesData } from './Home.action';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            skip: 0,
            limit: 100,
            year: null,
            launch: null,
            landing: null
        };
    }


    componentDidMount() {
        this.getLaunchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.launchesApiData !== this.props.launchesApiData) {
            const { skip } = this.state;
            const { isSuccess, isFailure, data, error } = this.props.launchesApiData;

            if(isSuccess) {
                this.setState({ skip: skip + 1 });
                
                //console.log('data', data);
            }
            else if(isFailure) {
                //console.log('error', error);
            }    
        }

    }

    getLaunchData() {
        const { skip, limit, year, launch, landing } = this.state;
        this.props.actions.getLaunchesData(skip, limit, year, launch, landing);        
    }
    
    onSelect(event) {
        const { name, value, checked } = event.target;

        console.log('select===>', name, value, checked);

        this.setState({
            skip: 0,
            [name]: value
        }, () => {
            this.getLaunchData();
        });
    };

    render() {
        const { history, launchesApiData } = this.props;

        const { isLoading, data } = launchesApiData 

        const launch = [
            'true', 'false' 
        ];

        const landing = [
            'true', 'false'
        ]

        const year = [
            2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
        ];
        
        return (

            <div className='flex-container'>
                <div className='side'>

                    <div className='filter'>
                
                        <div className='filter-heading'>
                            <div>Successful Year</div>
                            <hr/>
                        </div>  
                        <div className='filter-content'>
                            {
                                year.map((value, index) => <Radio key={index} value={value} name='year' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>


                        <div className='filter-heading'>
                            <div>Successful Launch</div>
                            <hr/>
                        </div>  
                        <div className='filter-content'>
                            {
                                launch.map((value, index) => <Radio key={index} value={value} name='launch' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>


                        <div className='filter-heading'>
                            <div>Successful Landing</div>
                            <hr/>
                        </div>  
                        <div className='filter-content'>
                            {
                                landing.map((value, index) => <Radio key={index} value={value} name='landing' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>

                    </div>

                </div>

                <div className='main'>
                    <div className='launch'> 
                    {
                        isLoading
                            ? <Spinner /> 
                            : data.map((launch, index) => 
                                <Card key={index} launch={launch} history={history} />
                            )
                    }
                    </div>
                </div>

            </div>    
        )
    }
}


const mapStateToProps = (state) => {
    return {
        launchesApiData: state.home
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getLaunchesData}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);