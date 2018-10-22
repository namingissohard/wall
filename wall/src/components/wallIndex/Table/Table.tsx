import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore} from '../../../common/Dto';
interface TableProps{
    WallData?: wallStore;
    saveUserListConfig: Function;
    userInfoList: any;
}
interface TableState{
    
}
@inject('WallData')
@observer
export class Table extends React.Component<TableProps, TableState>{
    constructor(props: any){
        super(props)
    }
    saveUserListConfig(value: string, type: string, index: number){
        this.props.saveUserListConfig(value, type, index)
    }
    
    render (){
        const data = this.props.userInfoList
        return <div>
            <table className="table table-hover table-noborder">
                <thead>
                    <tr>
                        <th scope="col">User Type</th>
                        <th scope="col">Role</th>
                        <th scope="col">Email</th>
                        <th scope="col">Cell Phone</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Loaction</th>
                        <th scope="col">District</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user: any, index: number) => {
                           return <tr key={index}>
                                    <td><input type="text" 
                                        value={user.userType}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'userType', index)}/></td>
                                    <td><input type="text" 
                                        value={user.role}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'role', index)}/></td>
                                    <td><input type="text" 
                                        value={user.email}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'email', index)}/></td>
                                    <td><input type="text" 
                                        value={user.cellPhone}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'cellPhone', index)}/></td>
                                    <td><input type="text" 
                                        value={user.firstName}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'firstName', index)}/></td>
                                    <td><input type="text" 
                                        value={user.lastName}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'lastName', index)}/></td>
                                    <td><input type="text" 
                                        value={user.location}
                                        onChange={(e)=>this.saveUserListConfig(e.target.value, 'location', index)}/></td>
                                </tr>
                            
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}
