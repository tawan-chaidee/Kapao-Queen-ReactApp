import styled from "styled-components";

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

export default Button