import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KYCContextType {
  primaryKycData: any;
  setPrimaryKycData: React.Dispatch<React.SetStateAction<any>>;
  primaryKycResponse: any;
  setPrimaryKycResponse: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<KYCContextType | undefined>(undefined);

interface KYCProviderProps {
  children: ReactNode;
}

const KYCProvider: React.FC<KYCProviderProps> = ({ children }) => {
  const [primaryKycData, setPrimaryKycData] = useState({});
  const [primaryKycResponse, setPrimaryKycResponse] = useState({});

  const value: KYCContextType = {
    primaryKycData,
    setPrimaryKycData,
    primaryKycResponse,
    setPrimaryKycResponse,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useKYC = (): KYCContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useKYC must be used within a KYCProvider");
  }
  return context;
};

export default KYCProvider;
