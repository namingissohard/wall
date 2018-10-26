import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore} from '../../../common/Dto';
import {get} from '../../../utils';
interface CommentListProps{
    WallData?: wallStore;
}
interface CommentListState{
    
}
@inject('WallData')
@observer
export class CommentList extends React.Component<CommentListProps, CommentListState>{
    constructor(props: any){
        super(props)
    }
    componentDidMount(){
        get('http://localhost:3000').then(res => {
            this.props.WallData!.setComment(res.data)
        })
        
    }
    render (){
        const commentList = this.props.WallData!.commentData.map((comment, index)=>{
            return <div className="comment" key={`CommentList-${index}`}>
                <div className="comment-head"><img src={comment.head} /></div>
                <div className="right">
                    <div className="comment-name">{comment.name}</div>
                    <div className="comment-content">{comment.content}</div>
                    <div className="comment-time">{comment.time}</div>
                </div>
            </div>
        })
        
        return <div className="commentList">{commentList}</div>
    }
}
