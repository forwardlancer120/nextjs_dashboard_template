import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  //   update input value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(values);
    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  //   Validate values using a rules function
  const validate = (rules: (values: T) => Errors<T>) => {
    const validationErrors = rules(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  //   Reset form to initial values
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    validate,
    resetForm,
  };
}
