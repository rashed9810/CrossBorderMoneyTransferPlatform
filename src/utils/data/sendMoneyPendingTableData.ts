export type SendMoneyPendingTableDataType = {
    id: number,
    transfer: string,
    mtcnNumber: string,
    method: string,
    accountNumber: number,
    senderAmount: string,
    exchangeRate: string,
    fees_changes: number,
    sendingPurpose: string,
    sourceOfFund: string,
};

export const sendMoneyPendingTableData: SendMoneyPendingTableDataType[] = [
    {
        id: 1,
        transfer: 'Bank Transfer',
        mtcnNumber: "SR54473386",
        method: "Fidelity Bank Plc",
        accountNumber: 1841323498423234,
        senderAmount: "100.00",
        exchangeRate: "1.00 USD = 1609.00 NGN",
        fees_changes: 3.00,
        sendingPurpose: 'Others',
        sourceOfFund: 'Others',
    },
]