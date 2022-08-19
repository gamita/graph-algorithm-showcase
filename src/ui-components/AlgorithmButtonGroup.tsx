import { FC, useState } from 'react';
import Button from '@mui/material/Button';

type AlgorithmButtonGroupProps = {
    showEvent: VoidFunction;
    showButtonName?: string;
    runEvent: VoidFunction;
    runButtonName?: string;
    oneTimeRun?: boolean;
}

export const AlgorithmButtonGroup: FC<AlgorithmButtonGroupProps> = props => {

    const [isShown, setShown] = useState(false);
    const [isRun, setRun] = useState(false);
    const oneTimeRun = props.oneTimeRun === undefined ? true : props.oneTimeRun;

    return (
        <>
            <label style={{ fontWeight: "bold", marginRight: 15 }}>Step1: Show Graph</label>
            <Button variant="contained"
                disabled={isShown}
                onClick={() => { setShown(true); props.showEvent(); }}>
                {props.showButtonName ? props.showButtonName : "Show"}
            </Button>
            <label style={{ fontWeight: "bold", marginLeft: 30, marginRight: 15 }}>Step2: Run Algorithm</label>
            <Button variant="contained"
                disabled={!isShown || (isRun && oneTimeRun)}
                onClick={() => { setRun(true); props.runEvent(); }}>
                {props.runButtonName ? props.runButtonName : "Run"}
            </Button>
            <Button style={{ float: "right" }} variant="contained"
                onClick={() => window.location.reload()}>
                Reset
            </Button>
        </>
    );
}