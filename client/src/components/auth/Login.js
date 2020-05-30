import React from 'react';

const Login = () => {
  return (
    <section>
      <div className="login-container">
        <h3>Login</h3>
        <div className="login">
          <form className="form" action="#">
            <div className="form-group">
              <input
                className="input-fields"
                type="email"
                placeholder="Email Address"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input-fields"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
