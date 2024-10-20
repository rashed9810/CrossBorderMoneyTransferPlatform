import React, { useContext } from 'react';
import { NavigationContext } from './NavigationContext';

const useNavigationContext = () => {
    const context = useContext(NavigationContext);

    return context;
};

export default useNavigationContext;