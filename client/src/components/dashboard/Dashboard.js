import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";


const Dashboard = props => {

  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  return props.profile.loading && props.profile === null
    ? <Spinner />
    : (<>
    <h1 className="large">Dashboard</h1>
    <p className="lead">
      Welcome {props.auth.user && props.auth.user.name}
    </p>
    {props.profile !== null ?
    <><DashboardActions /></> 
    : 
    <>
      <p>You have not yet setup a profile, please add some info.</p>
      <Link  to="/create-profile" className="btn btn-primary my-1">
        Create profile
      </Link>
    </>}
    </>);
};


Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
