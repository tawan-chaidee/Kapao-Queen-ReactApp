import { useRef, useState } from "react"
import Button from "../components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faLock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import config from "../config";
import { useNavigate } from "react-router";

const LabelStyled = styled.label`
  color: #444;
  margin-bottom: 5px;
`

export default function Register() {
  let formData = useRef({})
  let [message, setMessage] = useState("")
  let navigate = useNavigate();

  function handleChange(e) {
    formData.current[e.target.name] = e.target.value
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(formData.current)
    setMessage("")

    // check if passwords match
    if (formData.current.password !== formData.current.confirm_password) {
      setMessage("Passwords do not match")
      return
    }

    // register request
    let data = await fetch(`${config.apiUrl}/user/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData.current)
    })
    data = await data.json()
    console.log(data)

    if (!data.success) {
      setMessage(data.message)
      return
    }

    navigate("/login")
  }

  return (
    <>
      <div className="login-container" >
        <h1>Register</h1>

        <div style={{
          color: "red",
          marginBottom: "1em" 
        }}>{message}</div>

        <form onSubmit={handleSubmit}>
          <LabelStyled htmlFor="username"><FontAwesomeIcon icon={faUser} /> Username Information</LabelStyled>
          <input type="text" id="username" name="username" required placeholder="Username*" onChange={handleChange} />
          <div style={{ display: "flex",gap: ".5em"}}>
            <input type="text" name="fname" placeholder="First Name..." onChange={handleChange} />
            <input type="text" name="lname" placeholder="Last Name..." onChange={handleChange} />
          </div>

          <LabelStyled htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</LabelStyled>
          <input type="text" id="email" name="email" placeholder="Email..." onChange={handleChange} pattern="(.*)@(.*)" />

          <LabelStyled htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password</LabelStyled>
          <input type="password" id="password" name="password" required onChange={handleChange} placeholder="Password...*" />
          <input type="password" name="confirm_password" required onChange={handleChange} placeholder="Password Confirmation*" />

          <LabelStyled htmlFor="address"><FontAwesomeIcon icon={faLocationDot} /> Address</LabelStyled>
          <input type="text" id="address" name="address" placeholder="Address..." onChange={handleChange} />

          <span style={{fontSize:".9em",color:"#444"}}>* = required</span>

          <div style={{ display: "flex",gap: ".5em"}}>
          <Button type="submit">Register</Button>
          <Button onClick={(e)=>{
            e.preventDefault()
            navigate("/login")
          }}>Back</Button>
          </div>
        </form>

      </div>
    </>
  )
}