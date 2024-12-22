import cronstrue from "cronstrue";


const parseCronExpression = (cronExpression) => {
    return cronstrue.toString(cronExpression,
        {
            use24HourTimeFormat: true
        });
};


export {parseCronExpression};