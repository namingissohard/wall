import * as React from 'react';
import { CommentEditor, CommentList} from '../../components';
import WallData from '../../store/store';
import { Provider } from 'mobx-react';
import './WallIndexContainer.css';
interface WallIndexContainerProps{
    
}
interface WallIndexContainerState{

}

export class WallIndexContainer extends React.Component<WallIndexContainerProps, WallIndexContainerState>{
    createComment(){

    }  
    render(){
        return <Provider WallData={WallData}><div>
                <CommentList />
                <CommentEditor />
            </div></Provider>
    }
}
