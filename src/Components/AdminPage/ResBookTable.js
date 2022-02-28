import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import ConformationBox from '../DialogBox/ConformationBox';

export default function ResBookTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [dialogContent, setDialogContent] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (type, row) => {
    setOpen(true);
    console.log(row);
    if(type=== 'conform'){
      setDialogTitle('Book');
      let content =  'Of '+row.name+' with seats: '+ row.reservedSeats;
      setDialogContent(content);
    }else{
      setDialogTitle('Delete');
      let content =  'Of '+row.name+' with seats: '+ row.reservedSeats;
      setDialogContent(content);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.ReservedList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.code}>
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? 
                              <div>
                                  <IconButton aria-label="Conform"  key={row.code} onClick={()=>handleClickOpen('conform',row)}>
                                      <AssignmentTurnedInIcon />
                                  </IconButton>
                                  <IconButton aria-label="Delete"  key={row.code} onClick={()=>handleClickOpen('delete',row)}>
                                      <DeleteIcon />
                                  </IconButton>
                              </div>
                              :value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.ReservedList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ConformationBox open={open} handleClose={()=>handleClose()} dialogTitle={dialogTitle} dialogContent={dialogContent}/>
    </div>
  );
}