"use client"
import Topbar from '@/components/Topbar'
// import TransactionsPage from '../user/transactions/transactionsPage/transactionsPage'
import SearchBox from '@/components/TransactionLog/SearchBox/SearchBox'
import TransactionsPage from './transactionsPage/transactionsPage'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle'




const page = () => {
    return (
        <div className=''>
            <Topbar>Transactions</Topbar>
            {/* <div className='absolute top-7 right-56'>
                <SearchBox/>
            </div> */}
            <CardSubTitle title='Transactions Log' />
            <div className='my-5 overflow-hidden'>
                <TransactionsPage />
            </div>
        </div>
    )
}

export default page
