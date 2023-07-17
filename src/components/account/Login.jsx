import {useState,useContext} from 'react';
import { Box,TextField,Button,styled,Typography } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({  //image is an object here so its properties are separated with commas ans also margin:auto works with display flex
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;             //moves the element in one line
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {  //used to apply CSS to child elements using the parent element
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    background: #FB641B;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
font-size=10px;
color:#ff6161;
line-height:0,
margin-top:10px,
font-weight:600
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 13px;
`;

//dummy object to hold initial values
const signUpInitialValues = {
    name:'',
    username:'',
    password:''
}

const loginInitialValues= {
    name:'',
  username:'',
  password:''
}

const Login = ({ isUserAuthenticated }) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleAccount]=useState('login');   //default state is login
    const [signup,setSignup]=useState(signUpInitialValues);
    const [login,setLogin]=useState(loginInitialValues);
    const[error,setError]=useState('');

    const { setAccount }= useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () =>{
        account === 'signup'? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) =>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }


    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
    
            // Check if response isSuccess property exists and is true
            if (response.isSuccess) {
                setError('');
                setSignup(signUpInitialValues);
                toggleAccount('login');
            } else {
                setError('Something went wrong! Please try again');
            }
        } catch (error) {
            // Handle errors that occurred during the API call
            console.error('Error occurred during signup:', error);
            setError('An error occurred during signup. Please try again later.');
        }
    };
    

    const onValueChange = (e) => {
         setLogin({...login,[e.target.name]: e.target.value})
    }

    const loginUser = async () =>{

        // const headers = {
        //     Accept: 'application/json, form-data',
        //     'Content-Type': 'application/json',
        //   };
          try{
        let response = await API.userLogin(login);
        console.log(response);
        if(response.isSuccess){
           setError('');

           sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
           sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);

           setAccount({ username: response.data.username, name: response.data.name})
           
           isUserAuthenticated(true);

           navigate('/');

        }else{
            setError("Something went wrong");
        }
    }
         catch(error){
          console.error('Error occurred during login:', error);
          setError('An error occurred during login. Please try again later.');
      }
};

    return (
        <Component>
        <Box>
            <Image src={imageURL} alt="login" />
            {
                account === 'login' ?
                
                    <Wrapper>
                    <TextField variant='standard'  onChange={(e) => onValueChange(e)} name='name' label='Enter username'/>
                    <TextField variant='standard'  onChange={(e) => onValueChange(e)} name='password' label='Enter password'/>

                    {error && <Error> {error}</Error>} 

                    <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <SignupButton onClick={()=> toggleSignup()}>Create an account</SignupButton>
                    </Wrapper>
                :
                    
                //signup
                    <Wrapper>
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='name' label='Enter Name'/>
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label='Enter username'/>
                    <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter password'/>
                    {error && <Error> {error}</Error>} 
                    <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                    <Text style={{textAlign:'center'}}>OR</Text>
                    <LoginButton variant='contained' onClick={() => toggleSignup()}>Already an account?</LoginButton>
                    </Wrapper>
                }

        </Box>
        </Component>
    )
}

export default Login;







