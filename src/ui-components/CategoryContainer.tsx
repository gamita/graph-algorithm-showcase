import { FC, ReactNode } from 'react';

type CategoryContainerProps = {
    children: ReactNode;
}

export const CategoryContainer: FC<CategoryContainerProps> = props => {
    return (
        <div style={{
            backgroundColor: "#fbfbfc",
            padding: "25px 45px 80px 50px",
            margin: "60px auto 80px auto",
            maxWidth: 1300
        }}>
            {props.children}
        </div>);
}