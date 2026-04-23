export interface Pet {
    id: string,
    title:string,
    description: string,
    url: string
    created: string
}

export type SortOption = 'name-asc' | 'name-desc' | 'date-newest' | 'date-oldest';
