export interface Post {
    id: number;
    topicName: string;
    author: string;
    content: string;
    createdOn: string;
    upVotes: number;
    downVotes: number;
    comments: number;
}