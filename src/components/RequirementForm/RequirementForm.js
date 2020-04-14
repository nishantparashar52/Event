import React from 'react';
import { Form, Field } from 'react-final-form'

export default MyForm = () => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Fill your requirements</h2>
        <h4>Feel free to share your requirement with us! </h4>
        <div>
          <label>Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>
        <div>
          <label>Phone</label>
          <Field name="phone" component="input" />
        </div>
        <Field
          name="bio"
          render={({ input, meta }) => (
            <div>
              <label>Email</label>
              <text {...input} />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        />
        <Field name="locality">
          {({ input, meta }) => (
            <div>
              <label>locality</label>
              <input type="text" {...input} placeholder="locality" />
              {meta.touched && meta.error && <span>{meta.error}</span>}
            </div>
          )}
        </Field>

        <button type="submit">Submit</button>
      </form>
    )}
  />
)