import * as React from 'react';
import { MultipleSelect } from '../../components/componentsLibrary/MultipleSelect'
import './draftBox.css';
interface draftBoxProps {

}
interface draftBoxState {
    selecteds: number[],
    allSelectData: NameId[]
}
interface NameId {
    name: string;
    id: number;
}
export class draftBox extends React.Component<draftBoxProps, draftBoxState>{
    constructor(props: draftBoxProps) {
        super(props)

        this.state = {
            selecteds: [],
            allSelectData: [{
                name: 'option1',
                id: 1
            },{
                name: 'option2',
                id: 2
            },{
                name: 'option3',
                id: 3
            },{
                name: 'option3',
                id: 3
            },{
                name: 'option4',
                id: 4
            },{
                name: 'option5',
                id: 5
            },{
                name: 'option6',
                id: 6
            },{
                name: 'option7',
                id: 7
            }]
        }
    }



    switchChecked(id: number, isChecked: boolean) {
        let newSelecteds = [...this.state.selecteds]
        isChecked ? newSelecteds.push(id) : newSelecteds = newSelecteds.filter(item => id !== item)
        this.setState({
            selecteds: newSelecteds
        })
    }

    render() {
        return <>
        <div onBlur={()=>{console.log(2333)}}>
            <MultipleSelect
                selectIds={this.state.selecteds}
                allSelectData={this.state.allSelectData}
                switchChecked={(id: number, isChecked: boolean)=>this.switchChecked(id, isChecked)} />
        </div>
        </>
    }
}
