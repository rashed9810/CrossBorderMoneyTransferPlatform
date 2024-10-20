export type RecipientsDataType = {
    id: number,
    icon: React.ReactNode,
    name: string,
    transfer: string,
    recipientsId: string,
    email : string,
    country : string,
    city_state : string,
    phone : string,
    method : string,
    account : string,
}


export const recipientsData: RecipientsDataType[] = [
    {
        id: 1,
        icon: (
            <svg width="12" height="12" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill="black" />
            </svg>
        ),
        name: 'Samit Kumar Baral',
        transfer: 'Bank Transfer',
        recipientsId: 'DPX002',
        email: 'samit@gmail.com',
        country: 'Nigeria',
        city_state: 'Benin City',
        phone: "1232445465",
        method: 'Fidelity Bank Plc',
        account: '1823404530923'
    },
    {
        id: 2,
        icon: (
            <svg width="12" height="12" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill="black" />
            </svg>
        ),
        name: 'Raymond',
        transfer: 'Bank Transfer',
        recipientsId: 'DPX003',
        email: 'raymond@gmail.com',
        country: 'Sudan',
        city_state: 'Benin City',
        phone: "1232445465",
        method: 'Fidelity Bank Plc',
        account: '1823404530923'
    },
]