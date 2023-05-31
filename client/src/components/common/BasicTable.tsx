import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  TablePagination,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GenericUknownValuesObject } from '@/types/index.type';

type Props = {
  dataset: GenericUknownValuesObject[];
  customHeaders?: string[];
  withCrudActions?: boolean;
  onDelete?: (arg: never) => void;
  onUpdate?: (arg: never) => void;
};

function paginateArray(
  array: GenericUknownValuesObject[],
  currentPage: number,
  pageSize: number
): GenericUknownValuesObject[] {
  // PAGES START FROM 0 NOT 1
  // Calculate start and end index for the slice
  const start = currentPage * pageSize;
  const endIdx = start + pageSize;
  return structuredClone(array).slice(start, endIdx);
}

function BasicTable({ dataset, customHeaders, withCrudActions, onDelete, onUpdate }: Props) {
  const theme = useTheme();
  const headers = dataset?.[0] && customHeaders ? customHeaders : Object.keys(dataset[0]).sort();

  const [visibleRows, setVisibleRows] = useState(dataset);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setVisibleRows(paginateArray(dataset, currentPage, rowsPerPage));
  }, [dataset, currentPage, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="students table">
        <TableHead>
          <TableRow>
            {withCrudActions
              ? ['Edit', 'Delete'].map((header) => (
                  <TableCell key={header}>{header.toUpperCase()}</TableCell>
                ))
              : ''}

            {headers.map((header) => (
              <TableCell key={header}>{header.toUpperCase()}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows?.length ? (
            visibleRows.map((row, index) => {
              return (
                <TableRow
                  key={index + '-' + currentPage}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100],
                    },
                  }}
                >
                  {withCrudActions ? (
                    <>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => onUpdate && onUpdate(row as never)}
                        />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          color="warning"
                          onClick={() => onDelete && onDelete(row as never)}
                        />
                      </TableCell>
                    </>
                  ) : (
                    <TableCell></TableCell>
                  )}

                  {headers.map((key, jIndex) => {
                    const value = row[key];
                    return (
                      <TableCell key={jIndex + '-' + index}>
                        {typeof value === 'string' ? value : value ? 'True' : 'False'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell sx={{ border: 'none' }} colSpan={headers.length}>
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component={'div'}
        count={dataset.length}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        onRowsPerPageChange={(ev) => {
          setRowsPerPage(+ev.target.value);
        }}
        onPageChange={(_, page) => {
          setCurrentPage(page);
        }}
      />
    </TableContainer>
  );
}

export default BasicTable;
