import React, { useContext, useEffect } from 'react';
import Styled from "styled-components";
import Store from '../Store/Store';
import { post } from 'axios';
import { dDayFormat, percentFormat } from '../Util/Util';
import DetailMain from './DetailMain';
import _DetailSub from './DetailSub';

function ProjectDetails() {
    const { projectInformation, projectInformationDispatch } = useContext(Store);
    // Get Project List
    useEffect(() => {
        const url = '/project';
        const data = {
            number: projectInformation.number
        }
        post(url, data).then(res=>{
            const newProjectInformation = {
                number: projectInformation.number,
                title: res.data.pro_title,
                target: res.data.pro_target,
                logo: res.data.pro_logo,
                creator: res.data.mem_id,
                dDay: dDayFormat(res.data.dday),
                price: res.data.pro_price,
                fundingCount: 1000, // 나중에 변경할 부분 - 임의로 값 고정
                save: res.data.pro_price*projectInformation.fundingCount,
                percent: percentFormat(res.data.pro_price*projectInformation.fundingCount, res.data.pro_target)
            }
            projectInformationDispatch( { type: 'PROJECT', payload: newProjectInformation });
        })
    }, [ projectInformation.number, projectInformation.fundingCount, projectInformationDispatch ]);
    return(
        <Container>
            <LeftSide>
                <DetailMain/>
            </LeftSide>
            <RightSide>
                <DetailSub/>
            </RightSide>
        </Container>
    );
}
export default ProjectDetails;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1665px;
    margin: 0 0 0 12.5%;
`
const LeftSide = Styled(Left)`
    width: 75%;
`
const RightSide = Styled(Left)`
    width: 24.5%;
`
const DetailSub = Styled(_DetailSub)`
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////