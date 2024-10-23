// context/SearchContext.tsx
import { ReactNode, createContext, useContext, useState } from 'react';

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    recipientSearchTerm: string;
    setRecipientSearchTerm: (term: string) => void;
}

const TransactionSearchContext = createContext<SearchContextType | undefined>(undefined);

export const TransactionSearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [recipientSearchTerm, setRecipientSearchTerm] = useState<string>('');

    return (
        <TransactionSearchContext.Provider value={{ searchTerm, setSearchTerm, recipientSearchTerm, setRecipientSearchTerm }}>
            {children}
        </TransactionSearchContext.Provider>
    );
};

export const useSearchTransaction = () => {
    const context = useContext(TransactionSearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
