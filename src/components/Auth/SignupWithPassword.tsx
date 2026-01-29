"use client";
import { UserIcon, EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { signUpWithEmail } from "@/services/auth.api.servics";
import { useFormValidation } from "@/hooks/use-form-validation";

export default function SignupWithPassword() {
  const {
    values,
    errors,
    handleChange,
    validate
  } = useFormValidation({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [apiErr, setApiError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const validationRules = (vals: typeof values) => {
    const errs: typeof errors = {};

    if (!vals.username.trim()) {
      errs.username = "Name is required";
    }

    if (!vals.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(vals.email)) {
      errs.email = "Email is invalid";
    }

    if (!vals.password.trim()) {
      errs.password = "Password is required";
    } else if (vals.password.length < 8) {
      errs.password = "Password must be at least 8 characters long";
    }

    if (vals.password !== vals.confirm_password) {
      errs.confirm_password = "Passwords do not match";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate(validationRules)) return;
  
    setLoading(true);

    try {
        const data = await signUpWithEmail(values);
        localStorage.setItem('token', data.access_token);                
    } catch (err: any) {
        setApiError(err.message || 'Something went wrong');
    } finally {
        setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="text"
        label="Name"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your name"
        name="username"
        handleChange={handleChange}
        value={values.username}
        icon={<UserIcon />}
        error={errors.username}
      />

      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={handleChange}
        value={values.email}
        icon={<EmailIcon />}
        error={errors.email}
      />

      <InputGroup
        type="password"
        label="Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your password"
        name="password"
        handleChange={handleChange}
        value={values.password}
        icon={<PasswordIcon />}
        error={errors.password}
      />

      <InputGroup
        type="password"
        label="Confirm Password"
        className="mb-5 [&_input]:py-[15px]"
        placeholder="Enter your confirm password"
        name="confirm_password"
        handleChange={handleChange}
        value={values.confirm_password}
        icon={<PasswordIcon />}
        error={errors.confirm_password}
      />

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign Up
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
        {apiErr && (
          <p className="mt-2 w-full text-sm text-red-500 text-center">
            {apiErr}
          </p>
        )}
      </div>
    </form>
  );
}
