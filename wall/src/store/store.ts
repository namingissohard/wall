import {observable, action} from 'mobx';

export class WallData{
    @observable commentData = []
    @action setComment(data: any){
        this.commentData = data
    }
    @action deleteComment(index: number){
        this.commentData.splice(index, 1)
    }
}
export default new WallData()