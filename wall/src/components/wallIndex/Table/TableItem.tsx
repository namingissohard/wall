import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { wallStore,roleDict } from '../../../common/Dto';
import { Selector } from './Selector'
interface TableItemProps {
    WallData?: wallStore;
    user: {
        userType: string;
        role: string;
        email: string;
        cellPhone: string;
        firstName: string;
        lastName: string;
        location: string;
        manually?: string;
    };
    index: number;
    saveUserListConfig: Function;
}
interface TableItemState {
    showPassword: boolean;
    locationSelector: string[];
}
@inject('WallData')
@observer
export class TableItem extends React.Component<TableItemProps, TableItemState>{
    constructor(props: any) {
        super(props)
        this.state = {
            showPassword: false,
            locationSelector: [],
        }
    }
    saveUserListRole(value: string) {
        this.props.saveUserListConfig(value, 'role', this.props.index)
    }
    saveUserlistLocation(value: string){
        this.props.saveUserListConfig(value, 'location', this.props.index)
    }
    switchPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }
    render() {
        const { user, index } = this.props,
            selectData = ['option1', 'option2', 'option3','storeManager','regionManager','groupManager','districtManager']
        return <tr>
            {
                this.state.showPassword ?
                    <td>
                        <input type="text"
                            disabled={user.hasOwnProperty("manually") && !!user.manually}
                            value={user.userType}
                            onChange={(e) => this.props.saveUserListConfig(e.target.value, 'userType', index)} />
                        <span onClick={() => this.switchPassword()}>隐藏</span>
                    </td>
                    :
                    <td>
                        <input type="password"
                            disabled={user.hasOwnProperty("manually") && !!user.manually}
                            value={user.userType}
                            onChange={(e) => this.props.saveUserListConfig(e.target.value, 'userType', index)} />
                        <span onClick={() => this.switchPassword()}>显示</span>
                    </td>
            }
            <td>
                <Selector selectorData={['please select role',...selectData]}
                    disable={false}
                    saveUserListConfig={(value: string)=>this.saveUserListRole(value)}
                    index={this.props.index} />
            </td>
            <td>
                <input type="text"
                    value={user.email}
                    onChange={(e) => this.props.saveUserListConfig(e.target.value, 'email', index)} />
            </td>
            <td><input type="text"
                    value={user.cellPhone}
                    onChange={(e) => this.props.saveUserListConfig(e.target.value, 'cellPhone', index)} />
            </td>
            <td><input type="text"
                    value={user.firstName}
                    onChange={(e) => this.props.saveUserListConfig(e.target.value, 'firstName', index)} />
            </td>
            <td>
                <input type="text"
                    value={user.lastName}
                    onChange={(e) => this.props.saveUserListConfig(e.target.value, 'lastName', index)} />
            </td>
            <td>
                <Selector selectorData={user.role!==''?(roleDict.hasOwnProperty(user.role)? roleDict[user.role]:[`none`]):['please select role first']}
                    disable={!roleDict.hasOwnProperty(user.role)}
                    saveUserListConfig={(value: string)=>this.saveUserlistLocation(value)}
                    index={this.props.index} />
            </td>
        </tr>
        
    }
}
