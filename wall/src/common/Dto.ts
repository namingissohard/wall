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