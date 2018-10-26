import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { wallStore } from '../../../common/Dto';
interface SelectorProps {
    WallData?: wallStore;
    selectorData: any[];
    saveUserListConfig: Function;
    index: number;
    disable: boolean;
}
interface SelectorState {

}
@inject('WallData')
@observer
export class Selector extends React.Component<SelectorProps, SelectorState>{
    constructor(props: any) {
        super(props)
        this.state = {
            showPassword: false
        }
    }


    render() {
        return <select disabled={this.props.disable}
            onChange={(e) => { this.props.saveUserListConfig(e.target.value) }}>
            {
                this.props.selectorData.map((option) => {
                    return <option value={option} key={option}>{option}</option>
                })
            }
        </select>
    }
}
