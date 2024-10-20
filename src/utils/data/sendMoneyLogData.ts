export type SendMoneyLogDataType = {
    id: number,
    name: string,
    transfer: string,
    status: string,
    recipientsId: string,
};


export const sendMoneyLogData: SendMoneyLogDataType[] = [
    {
        id: 1,
        name: 'Samit Kumar Baral',
        transfer: 'Bank Transfer',
        status: 'Pending',
        recipientsId: 'DPX002',
    },
    {
        id: 2,
        name: 'Other One',
        transfer: 'Bank Transfer',
        status: 'Pending',
        recipientsId: 'DPX002',
    },
    {
        id: 3,
        name: 'Agent One',
        transfer: 'Agent Transfer',
        status: 'Complete',
        recipientsId: 'AGT002',
    },
];