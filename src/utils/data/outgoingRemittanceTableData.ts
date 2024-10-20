export type OutgoingRemittanceTableDataType = {
    id: number,
    type: string,
    recipientName: string,
    transactionId: string,
    status: string,
};


export const OutgoingRemittanceTableData: OutgoingRemittanceTableDataType[] = [
    {
        id: 1,
        type: "Wallet",
        recipientName: "Samit Kumar Baral",
        transactionId: "T67U8IJ90ER4",
        status: "I have paid",
    },
    {
        id: 2,
        type: "Direct",
        recipientName: "Agent One",
        transactionId: "RI7U8IJ90EVE",
        status: "In Transit",
    },
    {
        id: 2,
        type: "Wallet",
        recipientName: "Raymond",
        transactionId: "RI7U8IJ90EVE",
        status: "Complete",
    },
]