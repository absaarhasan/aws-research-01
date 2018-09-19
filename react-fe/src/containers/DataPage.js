import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DataTable from '../components/DataTable';
import DataForm from '../components/DataForm';
import ModalWindow from '../components/ModalWindow';
import PageHead from '../components/PageHead';
import { API_URL , API_CONFIG } from '../constants/index'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify';
import {SignIn } from 'aws-amplify-react';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        position: "fixed",
        right: 0,
        bottom: 0
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            task: null,
            modalOpen: false,
            itemId: null,
            itemTimestamp: null,
            user: "TEST 01"
        };
        this.getItems = this._getItems.bind(this);
        this.deleteItem = this._deleteItem.bind(this);
        this.postItem = this._postItem.bind(this);
        this.patchItem = this._patchItem.bind(this);
        this.resetView = this._resetView.bind(this);
        this.resetState = this._resetState.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleSetTask = this._handleSetTask.bind(this);
        this.handleDeleteItem = this._handleDeleteItem.bind(this);
        this.handleOpenModal = this._handleOpenModal.bind(this);
        this.handleCloseModal = this._handleCloseModal.bind(this);
        this.handleEditItem = this._handleEditItem.bind(this);
        this.handleError = this._handleError.bind(this);
        this.apiInit = this._apiInit.bind(this);
    }

    componentDidMount() {
        this.getItems()
    }

    _getItems() {
        this.apiInit();
        API.get(
            API_CONFIG.name,
            API_CONFIG.path
        ).then(response => {
                this.setState({
                    isLoaded: true,
                    items: response.Items
                });
            }).catch(error => {
                this.handleError(error);
            });
    }

    _postItem(task, user) {
        this.apiInit();
        const body = {
            task: task,
            user: user
        };
        API.post(
            API_CONFIG.name,
            API_CONFIG.path,
            {body}
        ).then(response => {
                this.resetView();
            }).catch(error => {
                this.handleError(error);
            });
    }

    _deleteItem(id, timestamp) {
        this.apiInit();
        const body = {
            id: id,
            timestamp: timestamp.toString()
        };
        API.del(
            API_CONFIG.name,
            API_CONFIG.path,
            {body}
        ).then(response => {
                this.resetView();
            }).catch(error => {
                this.handleError(error);
            });
    }

    _patchItem(task, itemId, itemTimestamp) {
        this.apiInit();
        const body = {
            task: task,
            id: itemId,
            timestamp: itemTimestamp.toString()
        };
        API.patch(
            API_CONFIG.name,
            API_CONFIG.path,
            {body}
        ).then(response => {
                this.resetView();
            }).catch(error => {
                this.handleError(error);
            });
    }

    _handleDeleteItem(id, timestamp) {
        this.deleteItem(id, timestamp)
    }

    _handleSubmit(event) {
        const {
            task,
            itemId,
            itemTimestamp,
            user
            } = this.state;
        const isEditMode = itemId && itemTimestamp;
        isEditMode ?
            this.patchItem(task, itemId, itemTimestamp) :
            this.postItem(task, user);
        event.preventDefault();
    }

    _handleSetTask(event) {
        this.setState({task: event.target.value});
    }

    _handleOpenModal() {
        this.setState({modalOpen: true});
    }

    _handleCloseModal() {
        this.resetState();
    }

    _handleEditItem(id, timestamp, task) {
        this.setState({
            task: task,
            modalOpen: true,
            itemId: id,
            itemTimestamp: timestamp
        });
    }

    _resetState() {
        this.setState({
            isLoaded: true,
            task: '',
            modalOpen: false,
            itemId: null,
            itemTimestamp: null
        });
    }

    _resetView() {
        this.resetState();
        this.getItems();
    }

    _handleError(error) {
        this.resetState();
        this.setState({
            isLoaded: true,
            error
        });
    }

    _apiInit() {
        this.setState({
            isLoaded: true
        });
    }

    render() {
        const {
            error,
            isLoaded,
            items,
            task,
            modalOpen
            } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    className={classes.button}
                    onClick={this.handleOpenModal}
                >
                    <AddIcon />
                </Button>
                <Grid
                    container
                    spacing={24}
                    style={{padding: "40px"}}
                >
                    <Grid item xs={12}>
                        <PageHead
                            title="Task List"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DataTable
                            onDelete={this.handleDeleteItem}
                            onEdit={this.handleEditItem}
                            error={error}
                            isLoaded={isLoaded}
                            items={items}
                        />
                    </Grid>
                </Grid>
                <ModalWindow
                    isOpen={modalOpen}
                    handleClose={this.handleCloseModal}
                >
                    <DataForm
                        disabled={!task || !isLoaded}
                        onChange={this.handleSetTask}
                        value={task || ""}
                        onSubmit={this.handleSubmit}
                    />
                </ModalWindow>
            </div>
        )
    }
}

DataPage.propTypes = {};

export default  withAuthenticator(
    withStyles(styles)(DataPage),
    {includeGreetings: true}
);