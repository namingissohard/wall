import {observable, action} from 'mobx';

export class WallData{
    @observable commentData = [1,2,3]
    @action setComment(data: any){
        this.commentData = data
    }
}
export default new WallData()