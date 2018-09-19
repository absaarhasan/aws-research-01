import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const DataForm = props => {

    const {disabled,onChange,value,onSubmit} = props;
    return (
        <form onSubmit={onSubmit}>
            <Grid
                alignItems={"baseline"}
                container
                spacing={24}
                style={{padding: "40px"}}
            >
                <Grid item xs={12} md={10}>
                    <TextField
                        label="Add task"
                        placeholder="Add task"
                        fullWidth
                        margin="normal"
                        value={value}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        type="submit"
                        disabled={disabled}
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

DataForm.propTypes = {

};

export default DataForm;