import React, { useState, useEffect } from "react";
import User from "./User";
import UserForm from "./UserForm";
import formSchema from "../validation/formSchema";
import axios from "axios";
import * as yup from "yup";

const initialFormValues = {
  fName: "",
  lName:"",
  email: "",
  password: "",
  terms: {
    accept: false,
  },
};
const initialFormErrors = {
  fName: "",
  lName:"",
  email: "",
  password: "",
  terms: "",
};
const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUser] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const getUsers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUser([res.data, ...users]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onCheckboxChange = (evt) => {
    const { name } = evt.target;
    const { checked } = evt.target;
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]: checked,
      },
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      first_name: formValues.fName.trim(),
      last_name: formValues.lName.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(
        (accepted) => formValues.terms[accepted] === true
      ),
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Current Users</h1>
      </header>
      <div id='side'>
      <UserForm
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />

      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
      </div>
    </div>
  );
}
