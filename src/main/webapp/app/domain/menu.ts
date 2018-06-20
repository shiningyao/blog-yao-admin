interface Badge {
    name: string,
    type: 'success' | 'info' | 'warning'
}

export interface Menu {
    id: string;
    title: string;
    to?: string;
    badge?: Badge;
    iconClass?: string;
    children: Array<Menu>;
    $isOpen: boolean;
}