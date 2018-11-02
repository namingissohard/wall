import * as React from 'react';
import { inject, observer } from 'mobx-react';
import {wallStore, commentDto} from '../../../common/Dto';
import {get} from '../../../utils';
import commentIcon from '../../../source/icons/comment.png'
import likeIcon from '../../../source/icons/like.png'
interface CommentListProps{
    WallData?: wallStore;
    deleteComment: Function;
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
    deleteComment(index: number){
        this.props.deleteComment(this.props.WallData!.commentData[index]._id)
    }
    render (){
        const commentList = this.props.WallData!.commentData.map((comment: commentDto, index)=>{
            return <div className="comment" key={`CommentList-${index}`}>
                <div className="top">
                    <div className="comment-head"><img src={comment.head} /></div>
                    <div className="right">
                        <div className="comment-name">{comment.name}</div>
                        <div className="comment-content">{comment.content}</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="comment-time">{(new Date(comment.create_at as string)).toLocaleString()}</div>
                    <div className="comment-handle">
                        <img className="icon" src={commentIcon}/>
                        <img className="icon" src={likeIcon}/>
                        <div onClick={()=>this.deleteComment(index)}>删除</div>
                    </div>
                </div>
            </div>
        })
        
        return <div className="commentList">{commentList}</div>
    }
}
