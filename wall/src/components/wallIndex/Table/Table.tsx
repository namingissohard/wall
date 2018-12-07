import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore} from '../../../common/Dto';
import {TableItem} from './TableItem';
import axios, { AxiosResponse } from 'axios'
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
        super(props);
        
    }
    componentDidMount(){

    }
    setUploadRef(element:any){
        this.uploadInput = element;
    }

    saveUserListConfig(value: string, type: string, index: number){
        this.props.saveUserListConfig(value, type, index);
    }
    
    triggerFileInput(){
        this.uploadInput.click();
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
        axios({
            url: 'http://localhost:3000/returnFile',
            method: 'post',
            responseType: 'blob'
        }).then((res: AxiosResponse)=>{
            let blob = new Blob([res.data])
            const url = window.URL.createObjectURL(blob)
            let a = document.createElement('a')
            a.href = url
            a.download = 'test233.xlsx'
            a.click()
        })
    }


    handleDragLeave(e: any){
        console.log('dragleave')
    }

    handleDrop(e: React.DragEvent){
        console.log(e.dataTransfer.files)
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragCancel(e: any){
        console.log(e.type)
        e.stopPropagation()
        e.preventDefault()
    }

    render (){
        const data = this.props.userInfoList
        return <div>
            <div style={{width: "600", height: "300px", background: "#bbb"}}
                onDragOver={(e)=>this.handleDragCancel(e)}
                onDrop={(e)=>this.handleDrop(e)}>
                啊哈哈哈哈</div>
            <button onClick={()=>this.props.addUser()}  className="btn btn-primary">添加一条</button>
            <button className="btn btn-primary" onClick={()=>this.triggerFileInput()}>
                <input type="file" 
                    ref={(e)=>this.setUploadRef(e)} 
                    style={{ display: "none"}} 
                    onChange={(e)=>this.uploadExcel(e.target.files as FileList)}/>上传</button>
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
/*      sandbox下载测试
        //let data = await get('http://localhost:65185/File/DownloadImportUserTemplate')
        //console.log(data.length)
        //let blob = new Blob([data])
        //const url = window.URL.createObjectURL(blob)
        //let a = document.createElement('a')
        //a.download = 'test.xlsx'
        //a.href = url
        //a.click()
        
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:65185/File/DownloadImportUserTemplate', true);
        xhr.setRequestHeader("Authorization", `Bearer ${GetToken()}`);
        xhr.responseType = "blob";   //返回类型blob
        xhr.onload = function (this: XMLHttpRequest) {   //定义请求完成的处理函数
            if (this.status === 200) {
                var blob = new Blob([this.response]);
                const url = window.URL.createObjectURL(blob)
                let a = document.createElement('a')
                a.download = 'test.xlsx'
                a.href = url
                a.click()
            } else if (this.status === 504) {
                alert('导出失败，请求超时');
            } else {
                alert('导出失败');
            }
        };
        xhr.send();
*/ 