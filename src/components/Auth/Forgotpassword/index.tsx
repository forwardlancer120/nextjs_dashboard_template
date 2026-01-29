"use client";
import { useState } from "react";
import Link from "next/link";

import InputGroup from "@/components/FormElements/InputGroup";
import { useFormValidation } from "@/hooks/use-form-validation";

import { EmailIcon } from "@/assets/icons";

export default function Forgotpassword() {
  const { values, errors, handleChange, validate } = useFormValidation({
    email: "",
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
    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate(validationRules)) return;

    // You can remove this code block
    setLoading(true);

    setLoading(false);
  };

  return (
    <>
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
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Send Reset Link
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p>
          Remembered your password?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
