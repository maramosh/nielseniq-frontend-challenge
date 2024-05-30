import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    gap: 20px;
`

const Button = styled.button`
    padding: 10px 20px;
    background: #2C6EF9;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background 0.3s;

    &:hover {
        background: #1b4dd8;
    }
`;

const Typography = styled.p`
    font-size: 18px;
    margin-bottom: 10px;
`


const ErrorLoading = ({ onClick }) => {
    return (
        <Container>
            <Typography>Something went wrong... please try again later</Typography>
            <Button onClick={onClick}>Retry</Button>
        </Container>
    );
}

export default ErrorLoading;