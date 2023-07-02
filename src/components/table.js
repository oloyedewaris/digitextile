import { useTable } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function CustomTable({ columns, onRowClick, data, ...rest }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });

  return (
    <TableContainer mx='auto' align='center' minW={{ base: '90%', lg: '1184px' }} {...rest}>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-Table dynamically

            // Each row can be rendered directly as a string using the react-Table render method
            return (
              <Tr onClick={() => onRowClick(row.values.unitNo)} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <Td cursor={'pointer'} {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );

}