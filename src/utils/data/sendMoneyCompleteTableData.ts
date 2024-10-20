export type SendMoneyCompleteTableDataType = {
    id: number,
    name: string,
    country: string,
    exchangeRate: string,
    totalSendMoney: string,
    transactionid: string,
    recipient: string,
    bank_And_accountNumber: string
};

export const sendMoneyCompleteTableData: SendMoneyCompleteTableDataType[] = [
    {
        id: 1,
        name: 'Agent One',
        country: "Nigeria",
        exchangeRate: "0.00",
        totalSendMoney: "0.00",
        transactionid: 'XTYB259T5547HY',
        recipient: "Samit Kumar Baral",
        bank_And_accountNumber: 'Bank - 723498534509',
    },
]