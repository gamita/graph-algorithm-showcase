import { FC } from 'react';

type AlgorithmDescriptionProps = {
    children: string;
}

export const AlgorithmDescription: FC<AlgorithmDescriptionProps> = props => {
    return (
        <article style={{
            marginTop: 30,
            marginBottom: 40
        }}>
            {props.children}
        </article>
    );
}