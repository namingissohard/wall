import * as React from 'react';
import { CommentEditor, CommentList, Table } from '../../components';
import WallData from '../../store/store';
import { Provider } from 'mobx-react';
import './WallIndexContainer.css';
import { commentDto } from 'src/common/Dto';
import { post } from '../../utils'

interface WallIndexContainerProps {

}

interface WallIndexContainerState {
    userInfoList: any[];
}

export class WallIndexContainer extends React.Component<WallIndexContainerProps, WallIndexContainerState>{
    constructor(props: WallIndexContainerProps) {
        super(props)

        this.state = {
            userInfoList: [{
                userType: 'sms',
                role: '',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'please Select role first'
            }, {
                userType: 'sms',
                role: '',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'please Select role first'
            }, {
                userType: 'sms',
                role: '',
                email: 'chico.zeng@sb.com',
                cellPhone: '15675101991',
                firstName: 'chico',
                lastName: 'zeng',
                location: 'please Select role first'
            }]
        }
    }

    createComment(options: commentDto) {
        post('http://localhost:3000/createComment', options)
    }

    async deleteComment(commentId: string) {
        await post('http://localhost:3000/deleteComment', { commentId })
    }

    saveUserListConfig(value: string, type: string, index: number) {
        let newUserInfoList = this.state.userInfoList.slice()
        newUserInfoList[index][type] = value
        this.setState({
            userInfoList: newUserInfoList
        })
    }

    addUser() {
        this.setState(preState => {
            return {
                userInfoList: [{
                    userType: '',
                    role: '',
                    email: '',
                    cellPhone: '',
                    firstName: '',
                    lastName: '',
                    location: '',
                    manually: true
                },
                ...preState.userInfoList
                ]
            }
        })
    }

    render() {
        return <Provider WallData={WallData}>
            <div>
                <CommentList deleteComment={(comment: string) => this.deleteComment(comment)} />
                <CommentEditor createComment={(options: commentDto) => this.createComment(options)} />
                <Table
                    saveUserListConfig={(value: string, type: string, index: number) => this.saveUserListConfig(value, type, index)}
                    userInfoList={this.state.userInfoList}
                    addUser={() => this.addUser()} />
            </div>
        </Provider>
    }
}
