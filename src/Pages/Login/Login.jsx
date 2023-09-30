import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase";

const Login = () => {

      const [successUser, setSuccessUser] = useState('');
      const [userError, setUserError] = useState('');

      const handleSubmit = e => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            setSuccessUser('');
            setUserError('');

            signInWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        console.log(result.user);
                        setSuccessUser('Successfully Logged In...');

                        if (!result.emailVerified) {
                              alert('Please verify your email');
                              return;
                        }
                  })
                  .catch(error => {
                        setUserError(error.message);
                  })
      };

      return (
            <div className="h-screen flex justify-center items-center">

                  <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                              <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
                              <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                              </div>
                              <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                              </div>

                              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                              <div>
                                    {
                                          successUser && <p className="text-green-600">{successUser}</p>
                                    }
                                    {
                                          userError && <p className="text-red-500">{userError}</p>
                                    }
                              </div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Not registered? <Link to='/register' className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                              </div>
                        </form>
                  </div>

            </div>
      );
};

export default Login;