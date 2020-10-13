import React, {useContext} from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import Store from '../Store/Store';
import UpdateUser from '../Image/UpdateUser.png';
import SelectUpdateUser from '../Image/SelectUpdateUser.png';
import FundingList from '../Image/FundingList.png';
import SelectFundingList from '../Image/SelectFundingList.png';
import GradeUp from '../Image/GradeUp.png';
import SelectGradeUp from '../Image/SelectGradeUp.png';
import DeleteUser from '../Image/DeleteUser.png';
import SelectDeleteUser from '../Image/SelectDeleteUser.png';
import ProjectList from '../Image/ProjectList.png';
import SelectProjectList from '../Image/SelectProjectList.png';
import AddProject from '../Image/AddProject.png';
import SelectAddProject from '../Image/SelectAddProject.png';
import UserList from '../Image/UserList.png';
import SelectUserList from '../Image/SelectUserList.png';

function MyInformation() {
    const {globalState, globalStateDispatch} = useContext(Store);
    const { session } = useContext(Store);
    // Grade Per Menu List
    const common = [
        {id: 'updateUser', img: UpdateUser, select: SelectUpdateUser, title: '정보수정'},
        {id: 'fundingList', img: FundingList, select: SelectFundingList, title: '펀딩목록'},
        {id: 'gradeUp', img: GradeUp, select: SelectGradeUp, title: '창작자신청'},
        {id: 'deleteUser', img: DeleteUser, select: SelectDeleteUser, title: '회원탈퇴'}
    ]
    const creator = [
        {id: 'updateUser', img: UpdateUser, select: SelectUpdateUser, title: '정보수정'},
        {id: 'fundingList', img: FundingList, select: SelectFundingList, title: '펀딩목록'},
        {id: 'projectList', img: ProjectList, select: SelectProjectList, title: '프로젝트목록'},
        {id: 'addProject', img: AddProject, select: SelectAddProject, title: '프로젝트등록'},
        {id: 'deleteUser', img: DeleteUser, select: SelectDeleteUser, title: '회원탈퇴'}
    ]
    const admin = [
        {id: 'userList', img: UserList, select: SelectUserList, title: '회원목록'},
        {id: 'adminGradeUp', img: GradeUp, select: SelectGradeUp, title: '창작자승인'},
        {id: 'projectListAll', img: ProjectList, select: SelectProjectList, title: '프로젝트목록'},
    ]
    // My Information Setting
    const myInformation = [];
    let currentGrade = [];
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
    var i = 0;
    while(i <currentGrade.length){
        if(globalState.main === currentGrade[i].id){
            myInformation.push(
                <A key={i} id={currentGrade[i].id} onClick={(e)=>changeState(e)}>
                <SelectMenuContainer>
                    <ImageContainer>
                    <Image src={currentGrade[i].select}/>
                    </ImageContainer>
                    <TextContainer>
                    <Text>{currentGrade[i].title}</Text>
                    </TextContainer><br/>
                </SelectMenuContainer>
                </A>
            )
        }else{
            myInformation.push(
                <A key={i} id={currentGrade[i].id} onClick={(e)=>changeState(e)}>
                <MenuContainer >
                    <ImageContainer>
                    <Image src={currentGrade[i].img}/>
                    </ImageContainer>
                    <TextContainer>
                    <Text>{currentGrade[i].title}</Text>
                    </TextContainer><br/>
                </MenuContainer>
                </A>
            )
        }
        i += 1;
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