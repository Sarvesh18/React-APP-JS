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
            limit: 10,
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
                
                console.log('data', data);
            }
            else if(isFailure) {
                console.log('error', error);
            }    
        }

    }

    getLaunchData() {
        const { skip, limit, year, launch, landing } = this.state;
        this.props.actions.getLaunchesData(skip, limit, year, launch, landing);        
    }
    
    onSelect(event) {
        const { name, value } = event.target;
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
            <div className='container'>
                
                <div className='filter_container filter row'>

                        <div className='filter__heading'>
                            <p>Launch Year</p>
                            <hr/>
                        </div>
                        <div className='row'>
                            {
                                year.map((value, index) => <Radio key={index} value={value} name='year' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>


                        <div className='filter__heading'>
                            <p>Successful Launch</p>
                            <hr/>
                        </div>        
                        <div className='row'>
                            {
                                launch.map((value, index) => <Radio key={index} value={value} name='launch' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>


                        <div className='filter__heading'>
                            <p>Successful Landing</p>
                            <hr/>
                        </div>
                        <div className='row'>
                            {
                                landing.map((value, index) => <Radio key={index} value={value} name='landing' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>
                        
                </div>


                <div className='launch_container row'>
                    {
                        isLoading
                            ? <Spinner /> 
                            : data.map((launch, index) => 
                                <Card key={index} launch={launch} history={history} />
                            )
                    }
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