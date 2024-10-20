export type WalletLogDataType = {
    id: number,
    type: string,
    transfer: string,
    status: string,
    amount: string,
    transactionId: string,
};


export const walletLogData: WalletLogDataType[] = [
    {
        id: 1,
        type: "Deposit",
        transfer: "Bank Transfer",
        status: "Pending",
        amount: "100.0$",
        transactionId: "RT02374SCMES09023",
    },
    {
        id: 2,
        type: "Withdraw",
        transfer: "Bank Transfer",
        status: "Pending",
        amount: "100.0$",
        transactionId: "RT02374SCMES09023",
    },
    {
        id: 3,
        type: "Deposit",
        transfer: "Agent Transfer",
        status: "Complete",
        amount: "100.0$",
        transactionId: "RT02374SCMES09023",
    },

]

