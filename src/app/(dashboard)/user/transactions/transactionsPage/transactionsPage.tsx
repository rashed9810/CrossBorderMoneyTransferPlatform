import React from 'react';

import PaginationHome from './PaginationHome';
import TransactionTable from '@/components/TransactionLog/TransactionTable/TransactionTable';

const TransactionsPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-between mx-auto p-4 sm:px-8 lg:px-0 bg-white min-h-screen rounded-xl w-full">
      <div className=" px-0 w-full overflow-x-auto lg:overflow-hidden">
        <TransactionTable />
      </div>

      <div>
        <PaginationHome />
      </div>
    </div>
  );
};

export default TransactionsPage;
