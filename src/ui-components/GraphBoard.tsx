import { FC } from 'react';

type GraphBoardProps = {
    id: string;
}

export const GraphBoard: FC<GraphBoardProps> = props => {
    return (
        <div id={props.id}
            style={{
                backgroundColor: "#fbfbfb",
                width: '100%',
                height: 750,
                marginTop: 50,
                border: "solid 1.5px gainsboro",
                boxShadow: "2px 2px 5px rgba(100, 100, 100, 0.2) inset"
            }}></div>
    );
}