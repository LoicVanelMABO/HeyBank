//Liste des endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    USER_PROFILE: '/auth/profile',
    USER_EXISTS: '/auth/user/{clientCode}/exist',

    //Accounts endpoints
    CreateAccount: '/accounts',
    GetAccounts: '/accounts',
    GetOneAccount: '/accounts/{accountId}',

    //Transactions endpoints
    CreateTransaction: '/transactions/emit',
    GetAccountTransactions: '/accounts/{accountId}/transactions',
    GetOneTransaction: '/transactions/{transactionId}',
    CancelTransaction: '/transactions/{transactionId}/cancel'
};