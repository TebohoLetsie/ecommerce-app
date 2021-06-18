import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userAction'

const RegisterScreen =({location,history})=>{
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userRegister = useSelector(state=> state.userRegister)
    const {loading, error, userInfo} = userRegister
    const dispatch = useDispatch()

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password === confirmPassword){
            dispatch(register(name,email,password))
        }
        else{
            setMessage("Passwords do not match")
        }
     
    }
     return(
         <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>  }
            {error && <Message variant="danger">{error}</Message>  }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name"
                    placeHolder="Enter name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"
                    placeHolder="Enter email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                    placeHolder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                    placeHolder="Confirm password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
              <Button type='submit' variant="primary">Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
                </Col>
            </Row>
            
         </FormContainer>
     )
}

export default RegisterScreen