import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import EditOutlined from '@material-ui/icons/EditOutlined';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 200
    }
});

const DataTable = props => {

    const { classes , error, isLoaded, items , onDelete, onEdit} = props;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell  colSpan={3}>Item</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
          {items.map((item, i) => (
              <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                  {item.task}
                  </TableCell>
                  <TableCell style={{width: "10px", textAlign: "right"}}>
                      <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          onClick={() => onEdit(item.id , item.timestamp, item.task)}
                      >
                      <EditOutlined />
                      </IconButton>
                  </TableCell>
                  <TableCell style={{width: "10px", textAlign: "right"}}>
                      <IconButton
                          className={classes.button}
                          aria-label="Delete"
                          onClick={() => onDelete(item.id , item.timestamp)}
                      >
                        <DeleteOutline />
                      </IconButton>
                  </TableCell>
              </TableRow>
          ))}
                    </TableBody>
                </Table>
            </Paper>

        );
    }
}

DataTable.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    isLoaded: PropTypes.bool,
    items: PropTypes.array.isRequired
};

export default withStyles(styles)(DataTable);