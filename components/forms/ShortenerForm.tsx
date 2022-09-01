import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Divider, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { HomePageStates } from "@pages/Home";

import { Root } from "@components/forms/ShortenerForm.styles";

export interface ShortenerFormProps {
    onSubmit(value: ShortenerFormValues): void;
    setBoxState(enabled: boolean, fieldName: keyof HomePageStates): () => void;
    inputFocused: boolean;
    boxHovered: boolean;
}

export interface ShortenerFormValues {
    url: string;
}

const schema = yup
    .object({
        url: yup.string().required(),
    })
    .required();

export default function ShortenerForm({ setBoxState, boxHovered, inputFocused, onSubmit }: ShortenerFormProps) {
    const {
        handleSubmit,
        register,
        reset,
        formState: { isValid, isSubmitting },
    } = useForm<ShortenerFormValues>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            url: "",
        },
    });

    const handleSubmitCallback = React.useCallback(
        async (value: ShortenerFormValues) => {
            await onSubmit(value);
            reset();
        },
        [onSubmit, reset],
    );

    let elevation = 1;
    if (isSubmitting) {
        elevation = 0;
    } else if (inputFocused) {
        elevation = 6;
    } else if (boxHovered) {
        elevation = 3;
    }

    return (
        <Root onSubmit={handleSubmit(handleSubmitCallback)}>
            <Paper
                elevation={elevation}
                sx={{ mr: 2, p: 1, display: "flex" }}
                onMouseOver={setBoxState(true, "boxHovered")}
                onMouseLeave={setBoxState(false, "boxHovered")}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1, width: 450 }}
                    placeholder="enter your url"
                    disabled={isSubmitting}
                    inputProps={{
                        "aria-label": "paste your url and shorten it",
                        ...register("url", { required: true }),
                    }}
                    onFocus={setBoxState(true, "inputFocused")}
                    onBlur={setBoxState(false, "inputFocused")}
                />
                <Divider orientation="vertical" sx={{ mx: 1 }} />
                <Tooltip title="Shortener settings">
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
            <Button type="submit" disableElevation={false} size="large" disabled={!isValid || isSubmitting}>
                Shorten up
            </Button>
        </Root>
    );
}
