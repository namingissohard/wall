export interface wallStore{
    commentData: any[];
    setComment: Function;
}
export interface commentDto{
    _id: string;
    name: string;
    head: string;
    content: string;
    time: Date;
}
export interface roleDictDto{
    storeManager: string[];
    districtManager: string[];
    regionManager: string[];
    groupManager: string[];

}
export const roleDict: roleDictDto = {
    storeManager: ['location1','location2','location3'],
    districtManager: ['district1','district2','district3'],
    regionManager: ['region1','region2','region3'],
    groupManager: ['group1','group2','group3'],
}