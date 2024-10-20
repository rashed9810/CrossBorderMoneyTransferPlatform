import { createContext, ReactNode, useState } from "react"


interface NavigationContextType {
    isNavOpen?: boolean;
    toggleNavigation?: () => void;
    openForgetPassword: boolean;
    setOpenForgetPassword: (value: boolean) => void;
    message: boolean;
    setMessage: (value: boolean) => void;
};

interface NavigationContextProviderProps {
    children: ReactNode;
}

export const NavigationContext = createContext<NavigationContextType | null>(null);


const NavigationContextProvider: React.FC<NavigationContextProviderProps> = ({children}) => {
    const [navOpen, setNavOpen] = useState(true);
    const [openForgetPassword, setOpenForgetPassword] = useState(false);
    const [message, setMessage] = useState(false);

    const toggleNavigation = () =>{
        setNavOpen(!navOpen);
    }

    const info: NavigationContextType = {
        isNavOpen: navOpen,
        toggleNavigation,
        openForgetPassword, 
        setOpenForgetPassword,
        message,
        setMessage
    };

    return <NavigationContext.Provider value={info}>
        {children}
    </NavigationContext.Provider>
};

export default NavigationContextProvider;
