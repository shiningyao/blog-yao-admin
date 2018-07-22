export enum PostStatus {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    TRASHED = 'TRASHED'
}

export interface ArticleHeader {
    title: string,
    author: object,
    category: string,
    publishDate: string,
    status: PostStatus,
    modifyDate: Date
}

export interface ArticleBody {
    content: string
}

export interface Article extends ArticleHeader, ArticleBody {
    id: string 
}