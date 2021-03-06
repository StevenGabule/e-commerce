import Head from "next/head";
import Link from "next/link";
import React from "react";

function SignIn() {
  return (
    <div>
      <Head>
        <title>Sign in</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: 500 }}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <small id="emailHelp" className="form-text text-muted">
            Well never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-dark btn-block">
          Sign In
        </button>
        <p className="my-2">
          You dont have an account?{" "}
          <Link href={"/register"}>
            <a className="text-bold text-warning">Register here!</a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
