import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    descripton: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            value={title}
            onChange={(e) => onChange(e)}
            placeholder='* Job Title'
            name='title'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={company}
            onChange={(e) => onChange(e)}
            placeholder='* Company'
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            value={location}
            onChange={(e) => onChange(e)}
            placeholder='Location'
            name='location'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            value={from}
            onChange={(e) => onChange(e)}
            name='from'
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              name='current'
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            disabled={toDateDisabled ? 'disabled' : 's'}
            value={to}
            onChange={(e) => onChange(e)}
            name='to'
          />
        </div>
        <div className='form-group'>
          <textarea
            value={description}
            onChange={(e) => onChange(e)}
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
