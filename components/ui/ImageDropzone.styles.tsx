import styled from "@emotion/styled";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(2)};
    border: 2px dashed #ccc;
    border-radius: 4px;

    color: #aaa;
    cursor: pointer;

    transition: ${({ theme }) => theme.transitions.create(["color", "border-color"], { duration: 200 })};

    &:hover {
        border-color: #8d8d8d;
        color: #6c6c6c;
    }
`;

export const Preview = styled.img`
    max-width: 100%;
    max-height: 300px;

    margin: 0 auto;

    display: block;
`;
