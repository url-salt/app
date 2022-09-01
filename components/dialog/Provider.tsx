import React from "react";

import { Backdrop, CircularProgress } from "@mui/material";

import { DialogContextProvider } from "@components/dialog";

interface DialogItem {
    message: string;
    title?: string;
}

export interface DialogProviderProps {
    children: React.ReactNode;
}
export interface DialogProviderStates {
    dialogQueue: DialogItem[];
    backdropVisibility: boolean;
}

export default class DialogProvider extends React.Component<DialogProviderProps, DialogProviderStates> {
    public state: DialogProviderStates = {
        dialogQueue: [],
        backdropVisibility: false,
    };

    private setBackdropVisibility = (visible: boolean) => {
        this.setState({ backdropVisibility: visible });
    };
    private showDialog = (message: string, title?: string) => {
        this.setState(prevState => ({
            dialogQueue: [...prevState.dialogQueue, { message, title }],
        }));
    };

    public render() {
        const { children } = this.props;
        const { backdropVisibility } = this.state;

        return (
            <DialogContextProvider
                value={{ showDialog: this.showDialog, setBackdropVisibility: this.setBackdropVisibility }}
            >
                {children}
                <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={backdropVisibility}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </DialogContextProvider>
        );
    }
}
