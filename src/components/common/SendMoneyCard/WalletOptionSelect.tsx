import useMainWallet from '@/components/hooks/useMainWallet';
import useSubWallets from '@/components/hooks/useSubWallets';
import SelectOptions from '@/components/shared/Select-options';

const WalletOptionSelect = ({ control }: { control: any }) => {
  const [mainWallet, , isPending] = useMainWallet()
  const [subWallet, , isSubWalletPending] = useSubWallets()

  console.log(isPending, isSubWalletPending, 'eq++++')
  const walletOptions = [mainWallet, ...subWallet]
  const options = walletOptions.map(item => {
    return {
      value: {
        ...item
      },
      label: item?.category === 'PRIMARY' ? `Main: ${item?.walletName}` : `Sub: ${item?.walletName}`
    }
  })
  return (
    <SelectOptions
      placeholder="Select Transfer Type"
      label="walletType"
      control={control}
      options={options}
      error="Please select wallet"
      borderColor={false}
    />
  )
}

export default WalletOptionSelect