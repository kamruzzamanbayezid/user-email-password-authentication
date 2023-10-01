import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../../firebase/firebase";
import { Link } from "react-router-dom";


const REgister = () => {

      const [successUser, setSuccessUser] = useState('');
      const [userError, setUserError] = useState('');
      const [emailValidate, setEmailValidate] = useState('');
      const [passwordValidate, setPasswordValidate] = useState('');

      const handleSubmit = e => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;

            setEmailValidate('');
            setPasswordValidate('');
            setSuccessUser('');
            setUserError('');

            if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
                  setEmailValidate('Enter a valid email address');
                  return;
            }
            else if (password.length < 6) {
                  setPasswordValidate('Email should have at least character');
                  return;
            }
            else if (!/[A-Z]/.test(password)) {
                  setPasswordValidate('Weak password.Please provide a strong password');
                  return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        setSuccessUser('Account Created Successfully...');

                        updateProfile(result.user, { 
                              displayName: name,
                        })

                        sendEmailVerification(result.user)
                        .then(()=> { 
                              alert('Please check your email')
                        })
                  })
                  .catch(error => {
                        setUserError(error.message)
                  })
      };

      return (
            <div className="h-screen flex justify-center items-center">

                  <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                              <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h5>
                              <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                              </div>
                              <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                              </div>
                              <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <input type='password' name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />

                              </div>
                              <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                          <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                    </div>
                                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Accept our <span className="underline hover:no-underline cursor-pointer">terms and condition</span></label>
                              </div>
                              <input type="submit" value="Register" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></input>
                              <div>
                                    {
                                          emailValidate && <p className="text-red-500">{emailValidate}</p>
                                    }
                                    {
                                          passwordValidate && <p className="text-red-500">{passwordValidate}</p>
                                    }
                                    {
                                          successUser && <p className="text-green-600">{successUser}</p>
                                    }
                                    {
                                          userError && <p className="text-red-500">{userError}</p>
                                    }
                              </div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Already have an account? <Link to='/login' className="text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                              </div>
                        </form>
                  </div>

            </div>
      );
};

export default REgister;