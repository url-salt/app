import React from "react";
import { Diff } from "utility-types";
import { useSnackbar } from "notistack";

import { DialogContextValue, useDialog } from "@components/dialog";

// These props will be injected into the base component
export interface WithDialogProps extends DialogContextValue, ReturnType<typeof useSnackbar> {}

export const withDialog = <BaseProps extends WithDialogProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    type HocProps = Diff<BaseProps, WithDialogProps>;

    function Hoc({ ...restProps }: HocProps) {
        const dialogValues = useDialog();
        const notistack = useSnackbar();

        return <BaseComponent {...(restProps as BaseProps)} {...dialogValues} {...notistack} />;
    }

    Hoc.displayName = `WithDialog(${BaseComponent.name})`;
    Hoc.WrappedComponent = BaseComponent;

    return Hoc;
};
