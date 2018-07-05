export enum PostStatus {
    ONLINE = 'online',
    OFFLINE = 'offline'
}

export interface ArticleHeader {
    title: string,
    author: string,
    category: string,
    content: string,
    publishDate: number,
    status: PostStatus,
    modifyDate: Date
}

export interface Article extends ArticleHeader {
    
}