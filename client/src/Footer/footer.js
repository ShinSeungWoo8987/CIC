import React, { useContext } from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function Footer() {
    return  <Container>
            경기도 화성시 봉담읍 상리 1182<br/>
            (주)CIC는 크라우드 펀딩 플랫폼을 운영하는 중개자(온라인소액투자중개업, 통신판매중개자)로서 크라우드펀딩 프로젝트를 진행하는 당사자가 아니기에, 투자로 인한 손실 보전, 리워드를 담보해드리지 못합니다.<p/>
            Copyright © 2019 funding4u. All rights reserved.
            </Container>
}
export default Footer;
const Container = Styled.div`
    float: left;
    width: 1650px;
    margin: 50px 0 0 0;
    padding: 25px 0 25px 250px;
    font-size: 10px;
    border-top: 1px solid #dfe6e9;
    color: #b2bec3;
`