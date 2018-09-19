import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {

    return {
        top: '50%',
        left: '0',
        width: '100%',
        boxSizing: 'border-box',
        transform: 'translate(0, -50%)'
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class ModalWindow extends React.Component {

    render() {
        const { classes, isOpen, handleClose, children } = this.props;

        return (

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={handleClose}
            >
                <div
                    style={getModalStyle()}
                    className={classes.paper}
                >
                {children}
                </div>
            </Modal>
        );
    }


}


export default withStyles(styles)(ModalWindow);