import styled from "styled-components";
import "./style/login.css"
import config from "../config";
import { useRef } from "react";
import Cookie from "universal-cookie";

const Button = styled.button`
  background-color: rgb(242, 133, 0);
  color: white;
  
  border: none;
  border-radius: 5px;

  width: 110px;
  height: 38px;

  transition: all 0.3s;

  :hover {
    outline: transparent;
    filter: brightness(125%);
    box-shadow: 0 5px 10px rgba(242, 133, 0, 0.8)
  }
`

export default function Login() {
  let formData = useRef({})

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
    console.log(data)

    // set token cookie
    const cookie = new Cookie()
    cookie.set("token", data.token, { path: "/" })

    // try access
    console.log("==access==")
    let access = await fetch(`${config.apiUrl}/user/access`,{
      credentials: 'include'
    })
    console.log(access)
    access = await access.text()
    console.log(access)
  }

  return (
    <>
      <div className="login-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <form method="POST">
          <label htmlFor="username">Username</label>
          <br />
          <input type="text" id="username" name="username" required onChange={handleChange} />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input type="text" id="password" name="password" required onChange={handleChange} />
          <br />

          <Button type="submit">Submit</Button>
          {/* <button type="submit" class="login_button">Submit</button> */}
        </form>
      </div>
    </>
  )
}