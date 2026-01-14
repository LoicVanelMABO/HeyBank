export interface Account {
    id: string;
    balance: number;
    ownerId: string;
    label: string;
    openAt: string; // ISO 8601 date string
}