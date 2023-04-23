import styled from "styled-components";
import "./style/login.css"
import config from "../config";
import { useContext, useRef } from "react";
import Cookie from "universal-cookie";
import { UserContext } from "../context";
import { useNavigate } from "react-router";
import Button from "../components/Button";

const LabelStyled = styled.label`
  color: #444;
  margin-bottom: 5px;
`

export default function Login() {
  let formData = useRef({})
  let [userData, setUserData] = useContext(UserContext)
  let navigate = useNavigate();

  function handleChange(e) {
    formData.current[e.target.name] = e.target.value
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // login
    let data = await fetch(`${config.apiUrl}/user/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formData.current)
    })
    data = await data.json()
    if (!data.success) {
      alert(data.message)
      return
    }
    console.log(data)

    // set token cookie
    const cookie = new Cookie()
    cookie.set("token", data.token, { path: "/" })

    // get user data
    let userData = await fetch(`${config.apiUrl}/user/${data.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include"
    })
    userData = await userData.json()

    // save user data to localStorage and rerender the navbar
    localStorage.setItem("user", JSON.stringify(userData.user))
    setUserData(userData.user)

    // redirect to home
    return navigate("/")
  }

  return (
    <>
      <div className="login-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <form method="POST">
          <LabelStyled></LabelStyled>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={handleChange} />

          <div style={{ display: "flex",gap: ".5em",justifyContent:"center"}}>
          <Button type="submit">Login</Button>
          <Button onClick={(e)=>{
            e.preventDefault()
            navigate("/register")
          }}>Register</Button>
          </div>
        </form>
      </div>
    </>
  )
}