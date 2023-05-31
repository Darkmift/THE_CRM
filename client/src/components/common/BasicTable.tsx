import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
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

function BasicTable({ dataset, customHeaders, withCrudActions, onDelete, onUpdate }: Props) {
  const theme = useTheme();
  const headers = dataset?.[0] && customHeaders ? customHeaders : Object.keys(dataset[0]).sort();

  useEffect(() => {
    console.log('🚀 ~ file: BasicTable.tsx:17 ~ BasicTable ~ headers:', {
      dataset,
      headers,
    });
  }, [dataset, headers]);

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
          {dataset?.length &&
            dataset.map((row, index) => {
              return (
                <TableRow
                  key={index}
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
                    ''
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
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
