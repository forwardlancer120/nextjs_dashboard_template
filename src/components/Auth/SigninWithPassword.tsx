"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { signInWithEmail } from "@/services/auth.api.services";
import { useFormValidation } from "@/hooks/use-form-validation";

export default function SigninWithPassword() {
  // const router = useRouter();
  const { values, errors, handleChange, validate } = useFormValidation({
    email: '',
    password: '',
    remember: false,
  });

  const [apiErr, setApiError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Validation rules
  const validationRules = (vals: typeof values) => {
    const errs: typeof errors = {};
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

    return errs;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate(validationRules)) return;

    // You can remove this code block
    setLoading(true);

    try {
        const data = await signInWithEmail(values);
        localStorage.setItem('token', data.access_token);
        window.location.href = "/dashboard";
        // optionally redirect or store token
    } catch (err: any) {
        setApiError(err.message || 'Something went wrong');
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={handleChange}
          checked={values.remember}
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
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
