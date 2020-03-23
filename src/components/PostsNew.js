import { each as _each, map as _map } from 'lodash';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title',
    required: true,
    validation: (values, errors) => {
      if (
        values.title &&
        (values.title.length < 3 || values.title.length > 10)
      ) {
        errors.title = 'Title length needs to be between 3 and 10 characters';
      }
    }
  },
  categories: {
    type: 'input',
    label: 'Categories',
    required: true
  },
  content: {
    type: 'textarea',
    label: 'Post Content',
    required: true
  }
};

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor={field.input.name}>
          {field.label}
        </label>

        <field.type className="form-control" type="text" {...field.input} />

        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit, anyTouched, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        {_map(FIELDS, ({ type, label }, fieldName) => {
          return (
            <Field
              label={label}
              name={fieldName}
              component={this.renderField}
              key={fieldName}
              type={type}
            />
          );
        })}
        <button disabled={submitting} type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/posts/index" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  // Check for required fields
  _each(FIELDS, (fieldObject, fieldName) => {
    // Check if the FIELDS config object has a custom validation function to run
    if (fieldObject.validation) {
      fieldObject.validation(values, errors);
    }

    // If the field is required as per the config object, check if the field is filled out
    if (fieldObject.required && !values[fieldName]) {
      errors[fieldName] = `Enter ${fieldName}`;
    }
  });

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
};

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));
