import * as React from 'react'
import { element } from 'prop-types';
interface MultipleSelectState {
    showOption: boolean;
    filterText: string
}

interface MultipleSelectProps {
    selectIds: number[];
    allSelectData: NameId[];
    switchChecked: Function;
}

interface NameId {
    name: string,
    id: number
}

interface OptionListProps {
    filterText: string;
    allSelectData: NameId[];
    selectIds: number[];
    switchChecked: Function;
}

export class OptionList extends React.Component<OptionListProps, {}>{

    render() {
        let sortArr: NameId[] = []
        let { filterText, allSelectData, selectIds, switchChecked } = this.props
        allSelectData.map(item => {
            selectIds.indexOf(item.id) !== -1 ? sortArr.unshift(item) : sortArr.push(item)
        })
        return sortArr.filter(item => item.name.search(filterText) !== -1).map(item => {
            return <li className="">
                <label>
                    <input
                        type="checkbox"
                        checked={selectIds.indexOf(item.id) !== -1}
                        value={item.id}
                        onChange={e => switchChecked(item.id, e.target.checked)} />
                    <span>{item.name}</span>
                </label>
            </li>
        })
    }
}

export class MultipleSelect extends React.Component<MultipleSelectProps, MultipleSelectState>{
    dropList: HTMLDivElement;
    constructor(props: MultipleSelectProps) {
        super(props)
        this.state = {
            showOption: false,
            filterText: ""
        }
    }

    switchShowOption() {
        const { showOption } = this.state
        this.setState({
            showOption: !showOption
        })


    }

    filterOption(filterText: string) {
        this.setState({ filterText: filterText })

    }

    render() {
        let selectedTextArr: string[] = []
        this.props.allSelectData.map(item => {
            this.props.selectIds.indexOf(item.id) > -1 ? selectedTextArr.push(item.name) : null
        })
        return <div className="multipleSelect" >
            <input
                className="multipleSelect-result-input"
                type="text"
                readOnly
                value={selectedTextArr.length < 4 ? selectedTextArr.join(',') : `${selectedTextArr.length} selected`}
                onClick={() => this.switchShowOption()} />


            <div className="multipleSelect-dropList"
                ref={(element) => { this.dropList = element! }}>

                <ul className="multipleSelect-ul">
                    <li>
                        <div className="multipleSelect-filter">
                            <span className="multipleSelect-filter-button">搜索</span>
                            <input
                                className="multipleSelect-filter-input"
                                type="text"
                                onChange={(e) => this.filterOption(e.target.value)} />
                            <span> delete </span>
                        </div>
                    </li>
                    <OptionList
                        allSelectData={this.props.allSelectData}
                        selectIds={this.props.selectIds}
                        filterText={this.state.filterText}
                        switchChecked={this.props.switchChecked} />
                </ul>


            </div>

        </div>
    }
}
console.log(23332)