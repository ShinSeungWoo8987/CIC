import React from 'react';
import { useRef } from 'react';
import AuthenticationService from './AuthenticationService'

function RegisterComponent(props) {
    const [usernameRef, passwordRef, nameRef, birthRef, phoneRef, postcodeRef, address1Ref, address2Ref] = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];
    const onSubmit = (e) => {
        e.preventDefault();
        AuthenticationService.executeRegisterService(
            usernameRef.current.value,
            passwordRef.current.value,
            nameRef.current.value,
            birthRef.current.value,
            phoneRef.current.value,
            postcodeRef.current.value,
            address1Ref.current.value,
            address2Ref.current.value
        ).then(res=>console.log(res));
    }
    return (
        <form>
            <input type='text' ref={usernameRef} placeholder='username'/> <br/>
            <input type='text' ref={passwordRef} placeholder='password'/> <br/>
            <input type='text' ref={nameRef} placeholder='name'/> <br/>
            <input type='text' ref={birthRef} placeholder='birth'/> <br/>
            <input type='text' ref={phoneRef} placeholder='phone'/> <br/>
            <input type='text' ref={postcodeRef} placeholder='postcode'/> <br/>
            <input type='text' ref={address1Ref} placeholder='address1'/> <br/>
            <input type='text' ref={address2Ref} placeholder='address2'/> <br/>
            <button onClick={(e)=>onSubmit(e)}>제출</button>
        </form>
    );
}

export default RegisterComponent;