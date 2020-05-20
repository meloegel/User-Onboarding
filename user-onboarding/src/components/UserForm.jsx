import React from "react";

export default function UserForm(props) {
  const {
    values,
    onInputChange,
    onSubmit,
    disabled,
    errors,
    onCheckBoxChange,
  } = props;

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div id="addUser">
          <div id='foo'>
        <h2>Add a User</h2>
        <button disabled={disabled}>Submit</button>
        </div>
        <div className="errors">
          <div>{errors.fName}</div>
          <div>{errors.lName}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
        <div className="forms inputs">
          <h4>User Information</h4>
          <label>
            First Name
            <input
              value={values.fName}
              onChange={onInputChange}
              name="fName"
              type="text"
            />
          </label>
          <label>
            Last Name
            <input
              value={values.lName}
              onChange={onInputChange}
              name="lName"
              type="text"
            />
          </label>
          <label>
            Email
            <input
              value={values.email}
              onChange={onInputChange}
              name="email"
              type="email"
            />
          </label>
          <label>
            Password
            <input
              value={values.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </label>
          <label>
            Terms of Service
            <input
              type="checkbox"
              name="accept"
              onChange={onCheckBoxChange}
              checked={values.terms.accepted}
            />
          </label>
        </div>
      </div>
    </form>
  );
}