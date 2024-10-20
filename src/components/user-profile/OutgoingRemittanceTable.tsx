import { OutgoingRemittanceTableData } from '@/utils/data/outgoingRemittanceTableData';
import React from 'react';

const OutgoingRemittanceTable = () => {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full text-[10px] '>
                <thead>
                    <tr className='border-b border-black flex flex-row justify-between pb-2 mb-2'>
                        <td>Type</td>
                        <td>Recipient</td>
                        <td>Transaction Id</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        OutgoingRemittanceTableData.map((data) => (
                            <tr key={data.id}
                                className='border-b border-black flex flex-row justify-between pb-4 mb-1.5 '
                            >
                                <td>{data.type}</td>
                                <td>{data.recipientName}</td>
                                <td>{data.transactionId}</td>
                                <td>{data.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OutgoingRemittanceTable;