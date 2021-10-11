import { Field, Form, Formik } from "formik";

const validation = (values) => {
  const error = {};

  if (!values.numericCode) {
    error.numericCode = "numericCode is required!";
  }

  if (!values.name) {
    error.name = "name is required!";
  }

  if (!values.population) {
    error.population = "population is required!";
  }

  if (!values.capital) {
    error.capital = "capital is required!";
  }

  return error;
};

const LongCountriesForm = ({ initialData, handleSubmit }) => {
  return (
    <div>
      <Formik
        initialValues={initialData}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validate={validation}
      >
        {({ errors, touched }) => (
          <Form>
            <label>
              Code
              <Field name="numericCode" placeholder="Code"  type="number"/>
              <span style={{ color: "red", fontSize: "10px" }}>
                {touched.numericCode && errors.numericCode}
              </span>
            </label>

            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="name" />
            <span style={{ color: "red", fontSize: "10px" }}>
              {touched.name && errors.name}
            </span>

            <label htmlFor="capital">Capital</label>
            <Field id="capital" name="capital" placeholder="capital" />
            <span style={{ color: "red", fontSize: "10px" }}>
              {touched.capital && errors.capital}
            </span>

            <label htmlFor="population">Population</label>
            <Field id="population" name="population" placeholder="population" />
            <span style={{ color: "red", fontSize: "10px" }}>
              {touched.population && errors.population}
            </span>

            <button className="btn-primary" type="submit">
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LongCountriesForm;
