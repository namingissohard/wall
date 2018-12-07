import * as React from 'react';
import { CommentEditor, CommentList } from '../../components';
import WallData from '../../store/store';
import { Provider } from 'mobx-react';
import './WallIndexContainer.css';
import { commentDto } from 'src/common/Dto';
import { post } from '../../utils'

interface WallIndexContainerProps {

}

interface WallIndexContainerState {
}

export class WallIndexContainer extends React.Component<WallIndexContainerProps, WallIndexContainerState>{
    constructor(props: WallIndexContainerProps) {
        super(props)

        this.state = {
            
        }
    }

    createComment(options: commentDto) {
        post('http://localhost:3000/createComment', options)
    }

    async deleteComment(commentId: string) {
        await post('http://localhost:3000/deleteComment', { commentId })
    }

    render() {
        return <Provider WallData={WallData}>
            <div>
                <CommentList deleteComment={(comment: string) => this.deleteComment(comment)} />
                <CommentEditor createComment={(options: commentDto) => this.createComment(options)} />
                
            </div>
        </Provider>
    }
}
