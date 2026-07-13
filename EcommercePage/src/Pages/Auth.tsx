import { useContext, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

export default function Auth() {
  const [mode, setMode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is invalid");
  }
  const { signUp, user, logout, login } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    let result: { success: true } | { success: false; error: string };

    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (!result.success) {
      setError(result.error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>user entered with {user.email}</p>}
          <button onClick={logout}>Logout</button>
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="youremail@example.com"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="********"
                id="password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain an uppercase letter and a number",
                  },
                })}
              />
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            <button className="btn btn-primary btn btn large" type="submit">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span
                  className="auth-link"
                  onClick={() => {
                    setMode("login");
                  }}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span
                  className="auth-link"
                  onClick={() => {
                    setMode("signup");
                  }}
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
