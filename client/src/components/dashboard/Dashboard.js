import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, [getCurrentProfile]);

  return props.profile.loading && props.profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large'>Dashboard</h1>
      <p className='lead'>Welcome {props.auth.user && props.auth.user.name}</p>
      {props.profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={props.profile.experience} />
          <Education education={props.profile.education} />
          <div className='my-2'>
            <button onClick={() => deleteAccount()} className='btn btn-danger'>
              Delete account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info.</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
