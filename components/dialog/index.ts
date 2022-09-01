import React from "react";

export interface DialogContextValue {
    showDialog(message: string, title?: string): void;
    setBackdropVisibility(visible: boolean): void;
}

const DialogContext = React.createContext<DialogContextValue>({
    showDialog() {},
    setBackdropVisibility() {},
});

export const DialogContextProvider = DialogContext.Provider;

export function useDialog() {
    return React.useContext(DialogContext);
}
