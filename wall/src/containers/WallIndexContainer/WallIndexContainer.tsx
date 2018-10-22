import * as React from 'react';
import { CommentEditor, CommentList, Table} from '../../components';
import WallData from '../../store/store';
import { Provider } from 'mobx-react';
import './WallIndexContainer.css';
interface WallIndexContainerProps{
    
}
interface WallIndexContainerState{
    userInfoList: any[]
}

export class WallIndexContainer extends React.Component<WallIndexContainerProps, WallIndexContainerState>{
    constructor(props: WallIndexContainerProps){
        super(props)
        this.state = {
            userInfoList: [{
                userType: 'sms',
                role: 'sb',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'die Sb Street 156st'
            },{
                userType: 'sms',
                role: 'sb',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'die Sb Street 156st'
            },{
                userType: 'sms',
                role: 'sb',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'die Sb Street 156st'
            }]
        }
    }
    createComment(){

    }
    saveUserListConfig(value: string, type: string, index: number){
        let tempName = `userInfoList[${index}][${type}]`
        this.state.userInfoList[index][type] = value
        this.setState({
            [tempName]: value
        } as any, ()=>console.log(this.state.userInfoList))
    }  
    render(){

        return <Provider WallData={WallData}><div>
                <CommentList />
                <CommentEditor />
                <Table 
                    saveUserListConfig={(value: string, type: string, index: number)=>this.saveUserListConfig(value, type, index)}
                    userInfoList={this.state.userInfoList}/>
            </div></Provider>
    }
}
