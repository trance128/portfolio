import React from 'react';

export const FormSegment = (props) => {
  return (
    <div className="form-group">
      <label>{props.name}</label>
      <input className="form-control"
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        min="0"
        onChange={props.callback} />
    </div>
  )
}
