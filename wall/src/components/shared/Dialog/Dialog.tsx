import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { wallStore } from '../../../common/Dto';
interface DialogProps {
    WallData?: wallStore;
}
interface DialogState {

}
@inject('WallData')
@observer
export class Dialog extends React.Component<DialogProps, DialogState>{
    constructor(props: any) {
        super(props)
        this.state = {
            showPassword: false
        }
    }


    render() {
        return null;
    }
}
