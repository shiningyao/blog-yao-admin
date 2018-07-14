export enum PostState {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    TRASHED = 'TRASHED'
}

export interface ArticleHeader {
    title: string,
    author: object,
    category: string,
    content: string,
    publishDate: string,
    state: PostState,
    modifyDate: Date
}

export interface Article extends ArticleHeader {
    
}