export enum PostStatus {
    ONLINE = 'online',
    OFFLINE = 'offline'
}

export interface ArticleHeader {
    title: string,
    author: string,
    category: string,
    content: string,
    publishDate: Date,
    status: PostStatus,
    modifyDate: Date
}

export interface Article extends ArticleHeader {
    
}