import styled from "styled-components";

const NavbarContainer = styled.nav`
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Navbar = () => {
    return (
        <NavbarContainer>
            <img src="https://crystalpng.com/wp-content/uploads/2023/03/Nielseniq-new-logo.png" alt="NielsenIQ Logo" width="50px" height="50px" />
        </NavbarContainer>
    );
}

export default Navbar;