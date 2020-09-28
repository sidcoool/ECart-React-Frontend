import React from 'react'
import GoogleLogin from 'react-google-login'
import logo from '../Images/logo.png'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import './topbar.css'

// email: "siddharthagoel1998@gmail.com"
// familyName: "Goel"
// givenName: "Siddhartha"
// googleId: "114178923310949080489"
// imageUrl: "https://lh3.googleusercontent.com/a-/AOh14GiPFJxDiohwWZql_13UVJnv42yxYQTlTKvoGVhQfw=s96-c"
// name: "Siddhartha Goel"

const gradient = {
    padding: "20px",
    width: "100%",
    height: "740px",
    // background: "#00B4DB",
    // background: "-webkit-linear-gradient(to right, #0083B0, #00B4DB)",
    background: "linear-gradient(to right, #0083B0, #00B4DB)"
}

export default function Login() {

    const successRes = (res) => {

        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("email", res.profileObj.email)
        localStorage.setItem("name", res.profileObj.givenName)
        console.log(res.profileObj)
        window.location.pathname = '/dashboard'
    }

    const failureRes = (res) => {
        console.log(res)
    }

    return (
        <div style={gradient}>
            {/* <h1 style={{ fontWeight: "bold" }}>Welcome User</h1><br /> */}
            {/* <h3 style={{ fontWeight: "bold" }}>Login/Signup</h3> */}

            <div className="d-flex justify-content-center">
                <Card style={{ padding: "10px" }} className="resDiv">
                    <CardBody>
                        <CardTitle>
                            <h3 style={{ fontWeight: "bold" }}>Login/Signup</h3>
                        </CardTitle>
                    </CardBody>
                    <img width="80%" className="mx-auto" src={logo} alt="Card image cap" />
                    <CardBody>
                        <GoogleLogin
                            clientId="871321053050-mkn67jcqu3dkt6be0pel1nj82boh97kp.apps.googleusercontent.com"
                            onSuccess={successRes}
                            onFailure={failureRes}
                            redirectUri="/dashboard"
                            buttonText = {<b> Sign in with Google </b>}
                            className="googlebutton mt-4 rounded-pill"
                        />
                    </CardBody>
                </Card>
            </div>


        </div>
    )
}
