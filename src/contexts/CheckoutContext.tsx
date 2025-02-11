import React, { createContext } from 'react';

interface CheckoutContextType {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setButtonLabel: React.Dispatch<React.SetStateAction<string>>;
    popupLabel: string;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export { CheckoutContext };
export type { CheckoutContextType };
