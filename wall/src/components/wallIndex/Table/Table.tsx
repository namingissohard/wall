import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore} from '../../../common/Dto';
import {TableItem} from './TableItem';
import axios from 'axios'
interface TableProps{
    WallData?: wallStore;
    saveUserListConfig: Function;
    userInfoList: any;
    addUser: Function;
}
interface TableState{
    
}
@inject('WallData')
@observer
export class Table extends React.Component<TableProps, TableState>{
    private uploadInput: HTMLInputElement;
    constructor(props: any){
        super(props)
    }
    setUploadRef(element:any){
        this.uploadInput = element
    }
    saveUserListConfig(value: string, type: string, index: number){
        this.props.saveUserListConfig(value, type, index)
    }
    triggerFileInput(){
        this.uploadInput.click()
    }
    uploadExcel(fileList: FileList){
        // let formData = new FormData()
        // formData.append('file', fileList[0])
        // formData.append('test', '233')
        // console.log(formData)
        // let blob = new Blob([fileList[0]],{"type": 'application/vnd.ms-excel'})
        // const url = window.URL.createObjectURL(blob)
        // console.log(url)
        // let a = document.createElement('a')
        // a.href = url
        // a.download = 'test233.xlsx'
        axios.post('http://localhost:3000/returnFile',{responseType: 'blob'}).then(res=>{
            let blob = new Blob([res.data],{"type": 'application/vnd.ms-excel'})
            const url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = 'test233.xlsx'
            a.click()
            console.log(url)
            console.log(res)
        })
        //a.click()
    }
    render (){
        const data = this.props.userInfoList
        return <div>
            <button onClick={()=>this.props.addUser()}  className="btn btn-primary">添加一条</button>
            <button className="btn btn-primary" onClick={()=>this.triggerFileInput()}><input type="file" ref={(e)=>this.setUploadRef(e)} style={{ display: "none"}} onChange={(e)=>this.uploadExcel(e.target.files as FileList)}/>上传</button>
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
                           return <TableItem user={user} index={index} saveUserListConfig={this.props.saveUserListConfig} key={`tableItem`+index}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    }
}
