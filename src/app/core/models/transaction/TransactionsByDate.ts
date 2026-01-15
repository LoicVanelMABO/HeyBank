import { Transaction } from "./Transaction";

export interface TransactionsByDate{
    date: string,
    items :Transaction[],
}