import React, { useContext } from 'react';
import styled from 'styled-components';
import Login from './Login';
import Search from './Search';
import Category from './Category';
import More from './More';
import MyInfo from './MyInfo';
import Store from '../Store/Store';
import Postcode from '../Components/Postcode';
import UpdateUser from '../MenuBar/UpdateUser';
import DeleteUser from '../MenuBar/DeleteUser';

function Head(props) {
    const { session } = useContext(Store);

    return (
        <Container>
            <Logo> <a href='/'>C I C</a> </Logo>
            <Category/>
            {session.state?<MyInfo/>:''}
            <More/>
            <Search/>
            <Login/>

            <Postcode/>
            <UpdateUser/>
            <DeleteUser/>
        </Container>
    );
}

export default Head;

const Container = styled.div`
    margin: 4px 0;
    font-size: 26px;
    font-weight: bold;
`
const Logo = styled.div`
    float: left;
    cursor: pointer;
`