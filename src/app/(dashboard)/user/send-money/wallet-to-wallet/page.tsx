"use client";
import LoaderSpinner from "@/components/LoaderSpinner";
import TopBar from "@/components/Topbar";
import SendMoneyCard from "@/components/common/SendMoneyCard/SendMoneyCard";
import CardSubTitle from "@/components/common/cardSubTitle/CardSubTitle";
import SelectDropdown from "@/components/common/dropdown/SelectDropdown";
import SendMoneyModal from "@/components/common/sendMoneyModal/SendMoneyModal";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import WalletToWalletModalForm, {
  TransactionPreparedTypes,
} from "@/components/send-money/WalletToWalletModalForm";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Wallet } from "lucide-react";
import DangerAlert from "@/components/ui/DangerAlert";

const WalletToWalletpage = () => {
  const transferOptions = [
    {
      name: "Wallet to Wallet",
      value: "WALLET_TO_WALLET",
    },
    {
      name: "Wallet to Bank",
      value: "WALLET_TO_BANK",
    },
    {
      name: "Bank to Bank",
      value: "BANK_TO_BANK",
    },
  ];

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionPreparedData, setTransactionPreparedData] =
    useState<TransactionPreparedTypes | null>(null);
  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted: isFormSubmitted },
  } = useForm<any>();
  const axiosInstance = useAxiosSecure();
  const [transferType, setTransferType] = useState(transferOptions[0].value);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [walletOptions, setWalletOptions] = useState([]);
  const [wallet, setWallet] = useState({} as any);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [amountExceedsBalance, setAmountExceedsBalance] = useState(false);

  const sendingAmount = watch("sendingAmount");

  useEffect(() => {
    if (sendingAmount) {
      const amount = parseFloat(sendingAmount);
      
      if (!wallet?.balance || amount <= wallet.balance) {
        setAmountExceedsBalance(false);
      } else {
        setAmountExceedsBalance(true);
      }
    } else {
      
      setAmountExceedsBalance(false);
    }
  }, [sendingAmount, wallet?.balance]); 


  const handleCloseModal = () => {
    setWalletModalOpen(false);
  };
  
  


  useEffect(() => {
    setIsSubmitted(isFormSubmitted);
  }, [isFormSubmitted]);

  const {
    data: userWalletData,
    isError: isUserWalletError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-wallet"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/wallet/user-wallets`);
      return res?.data?.data;
    },
  });

  useEffect(() => {
    const options = userWalletData?.map((item: any) => {
      return {
        value: {
          ...item,
        },
        name:
          item?.category === "PRIMARY"
            ? `Main: ${item?.walletName}`
            : `Sub: ${item?.walletName}`,
      };
    });
    setWalletOptions(options);
  }, [userWalletData]);

  const onSubmit = async (data: any) => {
    const amount = parseFloat(data.sendingAmount);
    if (amount > wallet.balance) {
      setAmountExceedsBalance(true);
      return;
    }

    const walletInfo = {
      transactionType: transferType,
      walletType: wallet?.category,
      amount: parseInt(data?.sendingAmount),
      recipientsWalletNumber: data.walletNumber,
      walletId: wallet?.id,
    };

    if (!wallet?.category || !data?.sendingAmount || !data?.walletNumber) {
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/transaction/wallet-to-wallet/initiate-transaction",
        walletInfo
      );
      if (res.status === 200) {
        const preparedRes = await axiosInstance.get(
          `/transaction/wallet-to-wallet/prepared/${res.data.data.id}`
        );
        setTransactionPreparedData(preparedRes.data.data);
        setWalletModalOpen(true);
        setIsSubmitted(false);
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message);
      setLoading(false);
      setIsSubmitted(false);
    } finally {
      setLoading(false);
      setIsSubmitted(false);
    }
  };

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  useEffect(() => {
    if (isUserWalletError) {
      toast.error(error.message);
    }
  }, [isUserWalletError, error]);

  const renderWalletBalance = () => {
    if (!Object.keys(wallet).length) return null;

    if (wallet.balance <= 0) {
      return <DangerAlert />;
    }

    
    return (
      <Alert className="mt-4 mb-2 border-[#723EEB] bg-[#723EEB]/10 rounded-[10px]">
        <Wallet className="h-4 w-4 text-[#723EEB]" />
        <AlertTitle className="text-[#723EEB]">Current Balance</AlertTitle>
        <AlertDescription className="mt-1">
          Your {wallet.category === "PRIMARY" ? "Main" : "Sub"} wallet balance
          is{" "}
          <span className="font-semibold text-[#723EEB] rounded-lg">
            {wallet.balance} {wallet?.currency?.code}
          </span>
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="min-h-screen max-h-auto">
      <TopBar>Send Money</TopBar>
      <CardSubTitle title="Send Money" />
      <div>
        <SendMoneyCard title="Wallet To Wallet Transfer">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[95%] lg:w-[45%] mx-auto mt-5 space-y-4"
          >
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
              placeholder="Select Sending Wallet"
              isLoading={isLoading}
              errorMassage="wallet is required"
              isSubmitted={isSubmitted}
            />
            {renderWalletBalance()}

            <div className="">
              <label className="font-semibold text-xs xl:text-sm">
                Sending Amount
              </label>
              <input
                type="text"
                {...register("sendingAmount", {
                  required: "Amount is required",
                })}
                className={`w-full mt-[7px] px-3 py-2 text-xs border rounded-[10px] focus:outline-none`}
                placeholder="Type Amount"
              />
              {amountExceedsBalance && (
              <Alert
                variant="destructive"
                className="mt-4 mb-2 border border-red-500 bg-red-50 rounded-[10px]"
              >
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertTitle className="text-red-500 text-xs xl:text-sm">
                Insufficient Balance
                </AlertTitle>
                <AlertDescription className="mt-1 text-xs">
                  The amount exceeds your available balance of {wallet.balance}{" "}
                  {wallet?.currency?.code}. Please enter a lower amount.
                </AlertDescription>
              </Alert>
            )}

              {errors.sendingAmount?.type === "required" && (
                <p className="text-red-500 text-xs ml-1 mt-1">
                  Amount is required
                </p>
              )}
            </div>

            <div className="">
              <label className="font-semibold text-xs xl:text-sm mb-2">
                Recipients Wallet Number
              </label>
              <input
                type="text"
                {...register("walletNumber", {
                  required: "Wallet Number is required",
                })}
                className={`w-full mt-[7px] px-3 py-2 text-xs border rounded-[10px] focus:outline-none`}
                placeholder="Type Wallet Number"
              />
              {errors.walletNumber?.type === "required" && (
                <p className="text-red-500 text-xs ml-1 mt-1">
                  Wallet Number is required
                </p>
              )}
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 rounded-full bg-[#723EEB] w-full"
              >
                {loading ? <LoaderSpinner className="h-4 w-4" /> : "Send"}
              </button>
            </div>
          </form>
        </SendMoneyCard>
      </div>
      <SendMoneyModal
        isOpen={walletModalOpen}
        onClose={handleCloseModal}
        title="Wallet To Wallet"
      >
        <WalletToWalletModalForm
          setWalletModalOpen={setWalletModalOpen}
          transferInfo={transactionPreparedData}
          currencySymbol={wallet?.currency?.symbol}
        />
      </SendMoneyModal>
    </div>
  );
};
export default WalletToWalletpage;
