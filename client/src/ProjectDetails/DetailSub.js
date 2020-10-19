import React, { useState } from 'react';
import Styled from 'styled-components';
import ProgressBar from 'react-percent-bar'
import { moneyFormat } from '../Util/Util';
import FundingState from './FundingState';
import Company from './Company';

function DetailSub(props) {
    return <>
        <FundingState />
        <Company />
    </>;
}

export default DetailSub;