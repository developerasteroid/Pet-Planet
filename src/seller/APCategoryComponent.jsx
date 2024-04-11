import React from 'react';
import './css/APCategoryComponent.css';
import PropTypes from 'prop-types';
import delta from './assets/delta.png';

const APCategoryComponent = (props) => {
  return (
    <div className="category-container" onClick={props.onClick}>
      <div className="category-img">
        <img src={props.img} alt="" className="img" />
      </div>
      <h1>{props.title}</h1>
      <p>{props.text}</p>
    </div>
  );
};

APCategoryComponent.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

APCategoryComponent.defaultProps = {
  img: delta,
  title: 'default',
  text: 'Default',
};

export default APCategoryComponent;
