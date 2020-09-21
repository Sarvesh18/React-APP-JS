import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { Spinner } from '@components';

import './Detail.css';
import { getLaunchDetail } from './Detail.action';

class Detail extends Component {

    static fetchData({ store, params: { id }}) {
        return store.dispatch(getLaunchDetail(id));
    };

    componentDidMount() {
        this.props.actions.getLaunchDetail(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detailApiData !== this.props.detailApiData) {
            
            const { isSuccess, isFailure, data, error } = this.props.detailApiData;

            if(isSuccess) {
            }
            else if(isFailure) {
            }    
        }

    }

    renderDetail() {
        const { flight_number, mission_name, launch_year, launch_date_utc, 
            is_tentative, tentative_max_precision, tbd, launch_window,
            rocket, launch_site, launch_success, links, details, upcoming, static_fire_date_utc } = this.props.detailApiData.data;
        
        // mission_id = [], ships = [], telemetry ={}, timeline: {}
        
        //const { rocket_id, rocket_name, rocket_type } = rocket;
        
        //const { site_id, site_name, site_name_long } = launch_site;
        
        //const { mission_patch, mission_patch_small, reddit_campaign, reddit_launch, reddit_recovery, reddit_media, presskit, article_link, wikipedia, video_link, youtube_id, flickr_images } = links;
        
        //flickr_images = []
        return (
            <div className='detail'>
                <p>Flight Number: {flight_number}</p>
                <p>Mission Name: {mission_name}</p>
                <p>Launch Year: {launch_year} </p>
                <p>Launch Date: {launch_date_utc} </p>
                <p>Launch Success: {launch_success ? 'true' : 'false'}</p>

                <p>Launch Window: {launch_window}</p>

                <p>Details: {details}</p>
            </div>
        )
    }

    render() {
        const { isLoading, data } = this.props.detailApiData;
        return (
            <div className="container">
                    {
                        isLoading
                            ? <Spinner />
                            : this.renderDetail()
                    }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        detailApiData: state.detail
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getLaunchDetail}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);