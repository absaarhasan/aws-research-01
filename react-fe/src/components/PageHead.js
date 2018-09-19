import React from 'react';
import Typography from '@material-ui/core/Typography';



const PageHead = props => {

    const { title } = props;

    return(
        <div>
            <Typography variant="headline" gutterBottom>
            {title}
            </Typography>
            <hr />
        </div>
    );
}

export default PageHead;