import {observable, action} from 'mobx';

export class WallData{
    @observable commentData = []
    @action setComment(data: any){
        this.commentData = data
    }
}
export default new WallData()