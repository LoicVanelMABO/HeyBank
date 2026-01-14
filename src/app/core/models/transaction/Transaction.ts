export interface Transaction {
    id: string;
    amount: number;
    description: string;
    emitter: {
        id: string;
        owner: {
            name: string;
        };
    };
    receiver: {
        id: string;
        owner: {
            name: string;
        };
    };
    emittedAt: string; // ISO 8601 date string
    status: string;

}
