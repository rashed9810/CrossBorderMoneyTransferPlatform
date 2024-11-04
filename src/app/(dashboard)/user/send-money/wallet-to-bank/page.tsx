'use client'
import LoadingSpin from '@/components/2fa-security/LoadingSpin';
import Topbar from '@/components/Topbar';
import SendMoneyCard from '@/components/common/SendMoneyCard/SendMoneyCard';
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import CurrencyDropdown from '@/components/common/dropdown/CurrencyDropdown';
import SelectDropdown from '@/components/common/dropdown/SelectDropdown';
import SendMoneyModal from '@/components/common/sendMoneyModal/SendMoneyModal';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const WalletToBankPage: React.FC = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosSecure();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const transferOptions = [{
    name: 'Wallet to Wallet',
    value: 'WALLET_TO_WALLET',
  }, {
    name: 'Wallet to Bank',
    value: 'WALLET_TO_BANK',
  }, {
    name: 'Bank to Bank',
    value: 'BANK_TO_BANK',
  }];

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [transferType, setTransferType] = useState(transferOptions[1].value);
  const [wallet, setWallet] = useState({} as any);
  const [walletOptions, setWalletOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [sendingCurrency, setSendingCurrency] = useState(wallet?.currency || {} as any);
  const [receivingCurrency, setReceivingCurrency] = useState({} as any);
  const [sendingAmount, setSendingAmount] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log(walletOptions);

  // fetching data from the server

  const { data: userWalletData, isError: isUserWalletError, isLoading } = useQuery({
    queryKey: ['user-wallet'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/wallet/user-wallets`);
      return res?.data?.data;
    },
  });
  const { data: currencyData, isError: isGetCurrencyError, isLoading: currencyLoading } = useQuery({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/currency`);
      return res?.data?.data;
    },
  });

  //Initiate Transaction
  const { data: transactionPostData, isSuccess: isTransactionSuccess, isPending: isTransactionPending, isError: transactionError, mutate: initiateTransactionMutate, error } = useMutation({
    mutationFn: async (value: {}) => {
      const response = await axiosInstance.post(`/transaction/wallet-to-bank/initiate-transaction`, value);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
    },
  });


  // wallet options
  useEffect(() => {
    const options = userWalletData?.map((item: any) => {
      return {
        value: {
          ...item
        },
        name: item?.category === 'PRIMARY' ? `Main: ${item?.walletName}` : `Sub: ${item?.walletName}`
      }
    })
    setWalletOptions(options);
  }, [userWalletData]);

  // currency options
  useEffect(() => {
    const options = currencyData?.map((item: any) => {
      return {
        value: {
          ...item
        },
        name: item?.name
      }
    })
    setCurrencyOptions(options);
  }, [currencyData]);

  useEffect(() => {
    setSendingCurrency(wallet?.currency || {} as any);
  }, [wallet]);


  // handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const newTransfer = {
      // "transactionType": transferType,
      "transactionType": "WALLET_TO_BANK",
      "walletType": wallet?.category,
      "amount": parseFloat(sendingAmount),
      "walletId": wallet?.id,
      "sendingCurrencyId": sendingCurrency?.id,
      "receivingCurrencyId": receivingCurrency?.id
    }
    if (!wallet?.category || !sendingAmount || !sendingCurrency || !receivingCurrency) {
      return;
    }
    initiateTransactionMutate(newTransfer);
  }

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index); // Close if it's already open
  };



  useEffect(() => {
    if (isUserWalletError) {
      toast.error('Get User Wallet Error');
    }
    if (isGetCurrencyError) {
      toast.error('Get User Currency Error');
    }
    if (transactionError) {
      toast.error(error?.message);
      setIsSubmitted(false);
    }
    if (isTransactionSuccess) {
      toast.success('Transaction Initiated');
      router.push(`/user/recipients/select-recipients?id=${transactionPostData?.data?.id}`);
      setIsSubmitted(false);
    }
  }, [isUserWalletError, isGetCurrencyError, transactionError, isTransactionSuccess, router, transactionPostData, error]);


  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      // You can customize the behavior here, e.g. force back to a specific page
      e.preventDefault();
      router.back(); // or router.push('/some-page');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]);

  return (
    <form onSubmit={handleSubmit} className='min-h-screen max-h-auto'>
      <Topbar>Send Money</Topbar>
      {/* <main className="container mx-auto px-4 py-8"> */}
      <CardSubTitle title="Send Money" />
      <SendMoneyCard title="Wallet To Bank Transfer">
        <div className='w-[95%] lg:w-[45%] mx-auto space-y-4 mt-5'>
          <SelectDropdown
            label="Transfer Type"
            options={transferOptions}
            selectedValue={transferType}
            setSelectedValue={setTransferType}
            isOpen={openDropdown === 0}
            onToggle={() => handleDropdownToggle(0)}
            fixedValue={true}
          />
          <SelectDropdown
            label="Select Sending Wallet"
            options={walletOptions}
            selectedValue={wallet}
            setSelectedValue={setWallet}
            isOpen={openDropdown === 1}
            onToggle={() => handleDropdownToggle(1)}
            placeholder='Select Sending Wallet'
            isLoading={isLoading}
            errorMassage='wallet is required'
            isSubmitted={isSubmitted}
            loadDataEmptyMassage='*Please Create a Wallet and Deposit money!'
          />
          {wallet?.walletId && (
            <Alert className="mt-4 mb-2 border-[#723EEB] bg-[#723EEB]/10 rounded-[10px]">
              <Wallet className="h-4 w-4 text-[#723EEB]" />
              <AlertTitle className="text-[#723EEB]">Current Balance</AlertTitle>
              <AlertDescription className="mt-1">
                Your {wallet?.category === "PRIMARY" ? "Main" : "Sub"} wallet balance
                is{" "}
                <span className="font-semibold text-[#723EEB] rounded-lg">
                  {wallet?.balance} {wallet?.currency?.code}
                </span>
              </AlertDescription>
            </Alert>
          )}
          <CurrencyDropdown
            label="Sending Currency"
            options={currencyOptions}
            selectedValue={sendingCurrency}
            setSelectedValue={setSendingCurrency}
            isLoading={currencyLoading}
            isOpen={openDropdown === 2}
            onToggle={() => handleDropdownToggle(2)}
            errorMassage='currency is required'
            isSubmitted={isSubmitted}
            fixedValue={true}
          />
          <CurrencyDropdown
            label="Receiving Currency"
            options={currencyOptions}
            selectedValue={receivingCurrency}
            setSelectedValue={setReceivingCurrency}
            isLoading={currencyLoading}
            isOpen={openDropdown === 3}
            onToggle={() => handleDropdownToggle(3)}
            errorMassage='currency is required'
            isSubmitted={isSubmitted}
          />
          <div className='w-full'>
            <label className="block mb-1 font-semibold text-xs xl:text-sm">Sending Amount</label>
            <input
              type="number"
              value={sendingAmount}
              onChange={(e) => setSendingAmount(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
              min={0}
              placeholder="Type Amount....."
            />
            {sendingAmount > wallet?.balance && (
              <Alert
                variant="destructive"
                className="mt-4 mb-2 border border-red-500 bg-red-50 rounded-[10px]"
              >
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-500 text-xs xl:text-sm">
                  Insufficient Balance
                </AlertTitle>
                <AlertDescription className="mt-1 text-xs">
                  The amount exceeds your available balance of {wallet?.balance}{" "}
                  {wallet?.currency?.code}. {wallet?.balance === 0 ? 'Please deposit in your wallet' : 'Please enter a lower amount.'}
                </AlertDescription>
              </Alert>
            )}
            {
              isSubmitted && sendingAmount === '' && <p className='text-red-500 font-medium text-xs'>Amount is required</p>
            }
          </div>
          <div className='flex flex-row justify-between items-center text-xs'>
            <h5 className="text-[#733ebc] font-semibold">Have a coupon code? </h5>
            <button
              onClick={() => setCouponModalOpen(true)}
              className='font-semibold text-white p-1 rounded-full bg-[#723EEB] w-14'
            >
              Apply
            </button>
          </div>
          {/* href="/user/recipients/select-recipients" */}
          <div className='w-full'>
            <button type='submit' className='font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 mt-3 rounded-full bg-[#723EEB] w-full flex justify-center'>
              {/* isTransactionPending */}
              {
                isTransactionPending ?
                  <LoadingSpin height='1rem' width='1rem' borderWidth='0.25rem' color='#fff' /> : 'Choose Recipients'
              }
            </button>
          </div>
        </div>
      </SendMoneyCard>
      {/* </main> */}

      <SendMoneyModal
        isOpen={couponModalOpen}
        onClose={() => setCouponModalOpen(false)}
      >
        <div className='space-y-2'>
          <div className="w-full">
            <label className="block mb-1 font-semibold text-xs">Coupon Code</label>
            <input
              type="text"
              name="couponCode"
              className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
            />
          </div>
          <button
            className='font-semibold text-white text-xs lg:text-xs p-[2px] lg:p-1 rounded bg-[#723EEB] w-full'>
            Apply
          </button>
        </div>
      </SendMoneyModal>
    </form>
  );
};

export default WalletToBankPage;