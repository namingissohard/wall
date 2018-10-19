import * as React from 'react';
import './LayoutContainer.css';
interface LayoutContainerProps{

}
interface LayoutContainerState{

}
export class LayoutContainer extends React.Component<LayoutContainerProps, LayoutContainerState>{
    render(){
        return <div>
            <div className="layout">WALL</div>
        {this.props.children}</div>
    }
}
