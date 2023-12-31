import { useRef } from "react";
import { BASE_URL } from "../helper/helper";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import user, { userActions } from "../store/user";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast();
  const emailRef = useRef();
  const passwordRef = useRef();
  const validateEmail = new RegExp(
    /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/
  );
  const validateEmailHandler = (email) => {
    if (validateEmail.test(email)) {
      return true;
    } else {
      toast({
        title: "Enter correct email address",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };
  const validatePasswordHandler = (password) => {
    if (password.trim().length > 5) {
      return true;
    } else {
      toast({
        title: "Password must contain atleast 6 characters.",
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const enteredData = { email: email, password: password };
    const validation =
      validateEmailHandler(enteredData.email) &&
      validatePasswordHandler(enteredData.password);
    if (validation) {
      const response = await fetch(BASE_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredData.email,
          password: enteredData.password,
        }),
      });
      const res = await response.json();
      if (response.status == 433) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 403) {
        toast({
          title: res.message,
          status: "error",
          isClosable: true,
        });
      } else if (response.status == 201) {
        dispatch(userActions.isLoggedIn(true));

        dispatch(userActions.isAdmin(res.user.admin));
        dispatch(userActions.setUserId(res.user._id));

        toast({
          title: res.message,
          status: "success",
          isClosable: true,
        });
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <section className="bg-light-bg ">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="text"
                    ref={emailRef}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    ref={passwordRef}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 "
                    required=""
                  />
                </div>
                <div className="py-2">
                  <button
                    type="submit"
                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
