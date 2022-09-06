import * as _ from "lodash";
import React from "react";
import memoizeOne from "memoize-one";

import { Box, Button, Dialog, DialogContent, TextField, Typography } from "@mui/material";

import ImageDropzone from "@components/ui/ImageDropzone";

import { Root } from "@components/dialog/ShortenerSettings.styles";

import { DEFAULT_VALUE } from "@constants/settings";
import { SettingsValue } from "@utils/types";

export interface ShortenerSettingsDialogProps {
    open: boolean;
    onClose(): void;
    onChange(value: SettingsValue): void;
    onClear(): void;
    value: SettingsValue | null;
}
export interface ShortenerSettingsDialogStates {
    value: SettingsValue;
}

export default class ShortenerSettingsDialog extends React.PureComponent<
    ShortenerSettingsDialogProps,
    ShortenerSettingsDialogStates
> {
    public state: ShortenerSettingsDialogStates = {
        value: DEFAULT_VALUE,
    };

    public componentDidUpdate(prevProps: Readonly<ShortenerSettingsDialogProps>) {
        if (this.props.open !== prevProps.open && this.props.open) {
            this.setState({ value: this.props.value || DEFAULT_VALUE });
        }
    }

    private handleInputChange = memoizeOne((name: "title" | "description") => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            this.setState(prevState => ({
                value: {
                    ...prevState.value,
                    [name]: value,
                },
            }));
        };
    });
    private handleDialogExited = () => {
        this.setState({
            value: DEFAULT_VALUE,
        });
    };
    private handleThumbnailChange = (file: File) => {
        this.setState(prevState => ({
            value: {
                ...prevState.value,
                thumbnail: file,
            },
        }));
    };
    private handleSubmit = () => {
        if (!_.eq(this.state.value, DEFAULT_VALUE)) {
            this.props.onChange(this.state.value);
        } else {
            this.props.onClear();
        }
    };

    public render() {
        const { open, onClose, onClear } = this.props;
        const { value } = this.state;
        const changed = !_.eq(this.state.value, DEFAULT_VALUE);

        return (
            <Dialog
                fullWidth
                open={open}
                maxWidth="xs"
                onClose={onClose}
                TransitionProps={{ onExited: this.handleDialogExited }}
            >
                <Root>
                    <Box p={2} borderBottom="1px solid #ccc">
                        <Typography variant="h6" textAlign="center">
                            Shortener Settings
                        </Typography>
                    </Box>
                    <DialogContent>
                        <Box mb={2}>
                            <Typography gutterBottom fontWeight={500} sx={{ userSelect: "none" }}>
                                Thumbnail
                            </Typography>
                            <ImageDropzone onChange={this.handleThumbnailChange} value={value.thumbnail} />
                            <Typography variant="caption" sx={{ pl: 0.5, mt: 0.5 }}>
                                Images only, 1200 * 630 recommended.
                            </Typography>
                        </Box>
                        <label>
                            <Typography gutterBottom fontWeight={500}>
                                Title
                            </Typography>
                            <TextField
                                placeholder="Page title"
                                size="small"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={value.title}
                                onChange={this.handleInputChange("title")}
                            />
                        </label>
                        <label>
                            <Typography gutterBottom fontWeight={500}>
                                Description
                            </Typography>
                            <TextField
                                placeholder="Page description"
                                size="small"
                                fullWidth
                                value={value.description}
                                sx={{ mb: 2 }}
                                onChange={this.handleInputChange("description")}
                            />
                        </label>
                    </DialogContent>
                    <Box p={2} borderTop="1px solid #ccc" display="flex" justifyContent="flex-end">
                        <Button variant="text" color="error" onClick={onClear} disabled={!changed}>
                            Clear
                        </Button>
                        <Box flex="1 1 auto" />
                        <Button variant="text" sx={{ mr: 1 }} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={this.handleSubmit} disabled={!changed}>
                            Apply
                        </Button>
                    </Box>
                </Root>
            </Dialog>
        );
    }
}
