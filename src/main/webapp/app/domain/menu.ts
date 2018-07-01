import { Path, LocationDescriptorObject } from "history";

interface Badge {
    name: string,
    type: 'success' | 'info' | 'warning'
}

interface Breadcrumb {
    name: string,
    i18n: string
}

export interface Menu {
    id: string;
    title?: string;
    i18n: string;
    to?: Path | LocationDescriptorObject;
    breadcrumb: boolean | Breadcrumb,
    badge?: Badge;
    iconClass?: string;
    children: Array<Menu>;
    $isOpen: boolean;
}