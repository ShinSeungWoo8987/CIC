import React, {useContext} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';

function MyInformation() {
    const {globalState, globalStateDispatch} = useContext(Store);
    const { session } = useContext(Store);
    const url = `https://crowdincreative.s3.ap-northeast-2.amazonaws.com/static/`;
    
    const common = [
        {id: 'updateUser', img: url+'UpdateUser.png', select: url+ 'SelectUpdateUser.png', title: '정보수정'},
        {id: 'fundingList', img: url+'FundingList.png', select: url+ 'SelectFundingList.png', title: '펀딩목록'},
        {id: 'gradeUp', img: url+'GradeUp.png', select: url+ 'SelectGradeUp.png', title: '창작자신청'},
        {id: 'deleteUser', img: url+'DeleteUser.png', select: url+ 'SelectDeleteUser.png', title: '회원탈퇴'}
    ]
    const creator = [
        {id: 'updateUser', img: url+'UpdateUser.png', select: url+ 'SelectUpdateUser.png', title: '정보수정'},
        {id: 'fundingList', img: url+'FundingList.png', select: url+ 'SelectFundingList.png', title: '펀딩목록'},
        {id: 'projectList', img: url+'ProjectList.png', select: url+ 'SelectProjectList.png', title: '프로젝트목록'},
        {id: 'addProject', img: url+'AddProject.png', select: url+ 'SelectAddProject.png', title: '프로젝트등록'},
        {id: 'deleteUser', img: url+'DeleteUser.png', select: url+ 'SelectDeleteUser.png', title: '회원탈퇴'}
    ]
    const admin = [
        {id: 'userList', img: url+'UserList.png', select: url+ 'SelectUserList.png', title: '회원목록'},
        {id: 'adminGradeUp', img: url+'GradeUp.png', select: url+ 'SelectGradeUp.png', title: '창작자승인'},
        {id: 'projectListAll', img: url+'ProjectList.png', select: url+ 'SelectProjectList.png', title: '프로젝트목록'},
    ]
    let currentGrade = []; // Select, Login User Grade Array
    const myInformation = []; // My Information Menu List Array
    // Login User Grade Setting
    switch(session.grade){
            default:
            currentGrade = [];
        break;
            case('0'):
            currentGrade = common
        break;
            case('1'):
            currentGrade = creator
        break;
            case('2'):
            currentGrade = admin
        break;
    }
    var idx=0;
    while(idx <currentGrade.length){
        if(globalState.main === currentGrade[idx].id){
            myInformation.push(
                <A key={idx} id={currentGrade[idx].id} onClick={(e)=>changeState(e)}>
                <SelectMenuContainer>
                    <ImageContainer>
                    <Image src={currentGrade[idx].select}/>
                    </ImageContainer>
                    <TextContainer>
                    <Text>{currentGrade[idx].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
                </A>
            )
        }else{
            myInformation.push(
                <A key={idx} id={currentGrade[idx].id} onClick={(e)=>changeState(e)}>
                <MenuContainer >
                    <ImageContainer>
                    <Image src={currentGrade[idx].img}/>
                    </ImageContainer>
                    <TextContainer>
                    <Text>{currentGrade[idx].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
                </A>
            )
        }
        idx += 1;
    }
    // Selected Menu Setting
    const changeState = (e) => {
        e.preventDefault();
        let newGlobalState;
        newGlobalState = {
            main: e.currentTarget.id,
            sub: globalState.sub
        }
        console.log(newGlobalState);
        globalStateDispatch( { type: 'GLOBAL', payload: newGlobalState });
    }
    return myInformation
}
export default MyInformation;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const MenuContainer = Styled(Left)`
  width: 220px;
  padding: 0 0 0 17.5px;
`
const SelectMenuContainer = Styled(MenuContainer)`
  font-weight: bold;
  text-shadow: 1px 1px 2px gray;  
  background-color: #A3A3A3;
`
const ImageContainer = Styled(Left)`
  width: 50px;
  line-height: 50px;
  margin: -2px 50px 0 0;
`
const Image = Styled.img`
  width: 30px;
  vertical-align: middle;
  
`
const TextContainer = Styled(Left)`
  height: 50px;
  line-height :50px;
`
const Text = Styled.div`
font-size: 17.5px;
`
const A = Styled.a`
  cursor: pointer;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////