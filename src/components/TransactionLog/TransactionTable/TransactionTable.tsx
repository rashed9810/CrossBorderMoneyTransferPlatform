import React, { useEffect, useState } from 'react';
import ProgressPayment from '../ProgressPayment/ProgressPayment';
import ProcessingPayment from '../ProgressPayment/ProcessingPayment';
import CompletePayment from '../ProgressPayment/CompletePayment';

interface Transaction {
    id: number;
    time: string;
    type: 'bank' | 'wallet' | 'card';
    amountSend: string;
    recipientGet: string;
    sender: string;
    recipient: string;
    agent: string;
    status: 'Complete' | 'Processing';
    receipt: string;
}

const TransactionTable = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    useEffect(() => {
        fetch('/data/transactionsData.json')
            .then((response) => response.json())
            .then((data: Transaction[]) => setTransactions(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleRowClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div>
            <table className="min-w-full bg-white text-nowrap overflow-x-auto">
                <thead>
                    <tr className="">
                        <th className="px-4 py-2 text-left text-gray-700">Time</th>
                        <th className="px-4 py-2 text-left text-gray-700">T.Type</th>
                        <th className="px-4 py-2 text-left text-gray-700">Amount Send</th>
                        <th className="px-4 py-2 text-left text-gray-700 ">Recipient Get</th>
                        <th className="px-4 py-2 text-left text-gray-700">Sender</th>
                        <th className="px-4 py-2 text-left text-gray-700">Recipient</th>
                        <th className="px-4 py-2 text-left text-gray-700">Agent</th>
                        <th className="px-4 py-2 text-left text-gray-700">Status</th>
                        <th className="px-4 py-2 text-left text-gray-700">Receipt</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                    {transactions.map((transaction) => (
                        <React.Fragment key={transaction.id}>
                            <tr
                                className={`${expandedRow === transaction.id
                                    ? 'bg-gray-200'
                                    : transaction.status === 'Processing'
                                        ? 'bg-gray-100 hover:bg-gray-200'
                                        : 'bg-white'
                                    } hover: cursor-pointer`}
                                onClick={() => handleRowClick(transaction.id)}
                            >
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.time}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    {transaction.status === 'Processing' && (
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                <path d="M8.14275 0L7.8508 0.145833L1.17747 3.41667L0.802098 3.60417V4.75H15.4834V3.60417L15.108 3.41667L8.43471 0.145833L8.14275 0ZM8.14275 1.5L12.0633 3.41667H4.22218L8.14275 1.5ZM2.13676 5.41667V12.0833H1.46943V13.4167H14.8161V12.0833H14.1487V5.41667H12.8141V12.0833H11.4794V5.41667H10.1448V12.0833H8.81009V5.41667H7.47542V12.0833H6.14076V5.41667H4.80609V12.0833H3.47143V5.41667H2.13676ZM0.134766 14.0833V15.4167H16.1507V14.0833H0.134766Z" fill="#4B4B4B" />
                                            </svg>
                                        </span>
                                    )}
                                    {transaction.status === 'Complete' && (
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M12.6458 0.000134987C12.5443 0.00273899 12.4375 0.0157603 12.3333 0.0418017L1.5 2.89597C0.625 3.12514 0 3.92722 0 4.83347V14.0001C0 15.0965 0.903646 16.0001 2 16.0001H14C15.0964 16.0001 16 15.0965 16 14.0001V5.33347C16 4.23711 15.0964 3.33347 14 3.33347H5.08333L12.6667 1.33347V2.6668H14V1.33347C14 0.583468 13.362 -0.0102817 12.6458 0.000134987ZM2 4.6668H14C14.3776 4.6668 14.6667 4.95586 14.6667 5.33347V14.0001C14.6667 14.3777 14.3776 14.6668 14 14.6668H2C1.6224 14.6668 1.33333 14.3777 1.33333 14.0001V5.33347C1.33333 4.95586 1.6224 4.6668 2 4.6668ZM12.3333 8.6668C11.7813 8.6668 11.3333 9.11472 11.3333 9.6668C11.3333 10.2189 11.7813 10.6668 12.3333 10.6668C12.8854 10.6668 13.3333 10.2189 13.3333 9.6668C13.3333 9.11472 12.8854 8.6668 12.3333 8.6668Z" fill="#4B4B4B" />
                                            </svg>
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.amountSend}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.recipientGet}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.sender}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.recipient}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{transaction.agent}</td>
                                <td className="px-4 py-2 text-sm">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${transaction.status === 'Complete'
                                            ? 'bg-[#3EAE50] text-white'
                                            : 'bg-[#FF9F43] text-white'
                                            }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    {transaction.receipt === 'Download' ? (
                                        <button className="px-3 py-1 text-xs font-semibold text-white bg-[#723EEB] rounded-full hover:bg-[#652ee4]">
                                            <span className='flex items-center gap-2'> <p>Download</p> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 5 7" fill="none">
                                                <path d="M0 0.25V6.75H5V0.25H0ZM0.5 0.75H4.5V6.25H0.5V0.75ZM2.35156 2.08594C2.27539 2.08496 2.18652 2.1123 2.125 2.16406C2.06152 2.21777 2.0332 2.28418 2.01562 2.35156C1.98145 2.48633 1.99121 2.62598 2.02344 2.78125C2.06152 2.96289 2.16992 3.18164 2.25781 3.39062C2.21289 3.58105 2.20117 3.75 2.13281 3.94531C2.07422 4.11328 1.99902 4.20996 1.92969 4.35938C1.77246 4.41895 1.58496 4.4541 1.46094 4.53125C1.32715 4.61426 1.20996 4.70605 1.14062 4.83594C1.07129 4.96582 1.0791 5.14941 1.17188 5.28125C1.21777 5.35059 1.27832 5.40527 1.35938 5.4375C1.44043 5.46973 1.52832 5.4707 1.60156 5.44531C1.74902 5.39453 1.85352 5.28125 1.95312 5.14844C2.0459 5.02539 2.11133 4.81641 2.19531 4.64844C2.32129 4.60645 2.41211 4.55371 2.54688 4.52344C2.6875 4.49219 2.78223 4.50684 2.91406 4.49219C2.9707 4.55664 3.01855 4.66016 3.07812 4.71094C3.19727 4.81445 3.32812 4.89648 3.48438 4.90625C3.64062 4.91602 3.79688 4.81836 3.88281 4.67188H3.89062V4.66406C3.92871 4.59766 3.95508 4.52539 3.95312 4.44531C3.95117 4.36523 3.91113 4.28125 3.85938 4.22656C3.75684 4.11719 3.62598 4.08887 3.48438 4.07031C3.375 4.05566 3.22266 4.09473 3.09375 4.10156C2.98047 3.95215 2.86816 3.83984 2.76562 3.64844C2.70996 3.54492 2.69531 3.45703 2.64844 3.35156C2.68457 3.18164 2.75586 2.99219 2.76562 2.84375C2.77734 2.66406 2.77051 2.50879 2.71875 2.36719C2.69238 2.2959 2.65039 2.22559 2.58594 2.17188C2.52344 2.12012 2.44238 2.08789 2.35938 2.08594C2.35645 2.08594 2.35449 2.08594 2.35156 2.08594ZM2.51562 3.9375C2.56055 4.0166 2.61621 4.06641 2.66406 4.14062C2.59375 4.15332 2.54004 4.14062 2.46875 4.15625C2.45703 4.15918 2.44922 4.16895 2.4375 4.17188C2.45215 4.13281 2.4707 4.10938 2.48438 4.07031C2.5 4.02441 2.50098 3.9834 2.51562 3.9375ZM3.4375 4.44531C3.52148 4.45605 3.55176 4.47168 3.5625 4.47656C3.56055 4.48047 3.56543 4.47949 3.5625 4.48438C3.53125 4.53613 3.52832 4.53223 3.50781 4.53125C3.49121 4.53027 3.42773 4.49609 3.36719 4.45312C3.38477 4.4541 3.42188 4.44336 3.4375 4.44531ZM1.6875 4.83594C1.67383 4.85645 1.66211 4.9043 1.64844 4.92188C1.57227 5.02344 1.50195 5.07031 1.48438 5.07812C1.48145 5.07422 1.48926 5.07812 1.48438 5.07031H1.47656C1.45117 5.03418 1.45801 5.04883 1.47656 5.01562C1.49512 4.98242 1.55371 4.91504 1.65625 4.85156C1.66406 4.84668 1.67969 4.84082 1.6875 4.83594Z"
                                                    fill="white"
                                                />
                                            </svg> </span>
                                        </button>
                                    ) : (
                                        <span className="text-gray-700">{transaction.receipt}</span>
                                    )}
                                </td>
                            </tr>
                            {expandedRow === transaction.id && (
                                <tr>
                                    <td colSpan={9} className="">
                                        <div className="p-4 bg-white">
                                            {transaction.status === 'Processing' ? (
                                                <ProcessingPayment />
                                            ) : (
                                                <CompletePayment />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
