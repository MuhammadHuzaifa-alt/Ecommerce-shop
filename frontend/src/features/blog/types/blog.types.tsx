export interface BlogCategory {
    id: number;
    name: string;
    count: number;
}

export interface BlogTag {
    id: number;
    name: string;
}

export interface Blog {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string;
    category: BlogCategory | null;
    author: string;
    date: string;
    readTime?: number | null;
    views?: number | null;
    tags: BlogTag[];
}

export interface RecentPost {
    id: number;
    title: string;
    image: string;
    date: string;
}