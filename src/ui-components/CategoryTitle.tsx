import { FC } from 'react';

type CategoryTitleProps = {
    title: string;
}

export const CategoryTitle: FC<CategoryTitleProps> = props => {
    return (
        <h2 style={{
            borderLeft: "solid lightsteelblue 10px",
            paddingLeft: 10
        }}>
            {props.title}
        </h2>);
}

export const CategorySubTitle: FC<CategoryTitleProps> = props => {

    return (
        <h3 style={{
            borderLeft: "double lightsteelblue 7px",
            paddingLeft: 13,
            marginTop: 70
        }}>
            {props.title}
        </h3>);
}