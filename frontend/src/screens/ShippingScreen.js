import React,{useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen=({history})=>{

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalAddress,setPostalAddress] = useState(shippingAddress.postalAddress)
    const [country,setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    
    const submitHandler =(e)=>{
        e.preventDefault()
        console.log(address,city,postalAddress,country)
        dispatch(saveShippingAddress({address,city,postalAddress,country}))

        history.push("/payment")

    }
    return(
        <FormContainer>
        <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text"
                    required
                    placeHolder="Enter address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text"
                    required
                    placeHolder="Enter City"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="postalAddress">
                    <Form.Label>Postal Adress</Form.Label>
                    <Form.Control type="text"
                    required
                    placeHolder="Enter postal address"
                    value={postalAddress}
                    onChange={(e)=>setPostalAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text"
                    required
                    placeHolder="Enter country"
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type ="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;