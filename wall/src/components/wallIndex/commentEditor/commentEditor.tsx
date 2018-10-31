import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore} from '../../../common/Dto';
interface CommentEditorProps{
    WallData?: wallStore;
    createComment: Function;
}
interface CommentEditorState{
    nickName: string;
    comment: string;
}
@inject("WallData")
@observer
export class CommentEditor extends React.Component<CommentEditorProps, CommentEditorState>{
    constructor(props: CommentEditorProps){
        super(props)
        this.state = {
            nickName: '',
            comment: ''
        }
    }
    editorConfigSave(value: string, type: string){
        this.setState({
            [type]: value
        } as Pick<CommentEditorState, keyof CommentEditorState>)
    }
    async createComment(){
        const commentOptions = {
            name: this.state.nickName,
            content: this.state.comment
        }
        this.props.createComment(commentOptions)
        
    }
    render (){
        
        return <div className="commentEditor">
            <h4>增加留言</h4>
            <div className="my-input-group">
                <label>昵称:</label>
                <input className="input"
                    type="text" 
                    value={this.state.nickName} 
                    onChange={(e)=>this.editorConfigSave(e.target.value, 'nickName')}/>
            </div>
            <div className="my-input-group">
                <label>留言:</label>
                <textarea id="editorComment" 
                    value={this.state.comment}
                    onChange={(e)=>this.editorConfigSave(e.target.value, 'comment')}
                    placeholder={`在这里写下你的伟论`}/>
            </div>
            <button 
                className="btn btn-primary btn-block"
                onClick={()=>this.createComment()}>提交</button>
        </div>
    }
}
