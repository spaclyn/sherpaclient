import React, {useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import {useHistory} from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const navTrips = ()=> {
        history.push("/mytrips")
    }

        const handleSubmit = (event) => {
        event.preventDefault()

        fetch("https://nar-sherpa.herokuapp.com/user/login", {
            method: 'POST',
            body: JSON.stringify({user:{email: email, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log(data)
            props.updateToken(data.sessionToken)
            navTrips()
        }).catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Login</h1>
            <center>
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name="email" value={email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password" >Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password"/>       
                </FormGroup>
                <br />
                {/* <Button type="submit" className="submit" onClick={navTrips}>Login</Button> */}
                <Button type="submit" className="submit">Login</Button>
            </Form>
            </center>
        </div>
    )
}

export default Login

