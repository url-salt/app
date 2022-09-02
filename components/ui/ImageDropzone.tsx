import React from "react";
import Dropzone, { DropzoneState } from "react-dropzone";

import { Typography } from "@mui/material";

import { Preview, Root } from "@components/ui/ImageDropzone.styles";

import { loadImage } from "@utils/loadImage";

export interface ImageDropzoneProps {
    value: File | null;
    onChange(file: File): void;
}

interface ImageDropzoneStates {
    imageUrl: string | null;
}

export default class ImageDropzone extends React.PureComponent<ImageDropzoneProps, ImageDropzoneStates> {
    public state: ImageDropzoneStates = {
        imageUrl: null,
    };

    public async componentDidMount() {
        if (!this.props.value) {
            return;
        }

        await this.loadImage(this.props.value);
    }
    public async componentDidUpdate(prevProps: Readonly<ImageDropzoneProps>) {
        if (this.props.value !== prevProps.value && this.props.value) {
            await this.loadImage(this.props.value);
            return;
        }
    }

    private loadImage = async (value: File) => {
        const url = await loadImage(value);
        this.setState({ imageUrl: url });
    };

    private handleDropAccepted = ([acceptedFile]: File[]) => {
        this.props.onChange(acceptedFile);
    };

    private renderContent = ({ getRootProps, getInputProps }: DropzoneState) => {
        const { value } = this.props;
        const { imageUrl } = this.state;

        return (
            <Root {...getRootProps()}>
                <input {...getInputProps()} />
                {imageUrl && <Preview src={imageUrl} />}
                {!imageUrl && (
                    <Typography color="inherit" textAlign="center" sx={{ userSelect: "none" }}>
                        Drop image file here, or click to select files.
                    </Typography>
                )}
            </Root>
        );
    };

    render() {
        return (
            <Dropzone
                onDropAccepted={this.handleDropAccepted}
                multiple={false}
                accept={{
                    "image/*": [".jpg", ".jpeg", ".png", ".webp", ".bmp"],
                }}
            >
                {this.renderContent}
            </Dropzone>
        );
    }
}
