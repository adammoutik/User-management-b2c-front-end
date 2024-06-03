import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookie from 'universal-cookie';
import { CookiesProvider, useCookies } from 'react-cookie'
import Cookies from 'js-cookie';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user'])
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(true);
  const base_url = 'http://localhost:3000'

  const handleSignIn = (e) => {
    e.preventDefault();
    // Function to pass email and password
    signInUser(email, password);
  };

  const signInUser = (email, password) => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Implement the actual sign-in logic here
    axios.post(`${base_url}/auth/login`,{email:email,password:password}).then(response => {
      const accessToken = response.data.accesstoken;
      Cookies.set('access_token', accessToken, {
        expires: 1, // expires in 1 day
        domain: 'localhost',
        path: '/',
        secure: false, // set to true if using HTTPS
        sameSite: 'trict', // set to 'trict' for better security
      });   
      // redirect to home page
      window.location.href = '/dashboard/home';
      return response.data;
  }).catch(error => {
    console.log(error.response.status)
    if (error.response && error.response.status !== 200) {
      setErrorMessage(JSON.stringify(error.response.data.message));console.log(errorMessage);    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  })
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
          {errorMessage &&   <Alert open={open} color={'red'} onClose={() => setOpen(false)} style={{"width":"50%","margin":"0 auto"}}>
       {errorMessage}
      </Alert>}
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              value={email}
              placeholder="name@mail.com"
              onChange={(e) => {setEmail(e.target.value)}}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" onClick={handleSignIn} fullWidth>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
           
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>

        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
