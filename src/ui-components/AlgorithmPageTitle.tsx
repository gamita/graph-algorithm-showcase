import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';

type PageTitleProps = {
    title: string;
    wikiUrl?: string;
}

export const AlgorithmPageTitle: FC<PageTitleProps> = props => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
                <h1 style={{ display: "inline", margin: 0 }}>{props.title}</h1>
                <span className="link" style={{ marginLeft: 50, marginBottom: 7 }}
                    onClick={() => window.open(props.wikiUrl)}>Wikipedia Link &#x2197;</span>
            </div>
            <hr />
        </>
    );
}