import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array(columns)
              .fill(0)
              .map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" width="60%" />
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array(columns)
                  .fill(0)
                  .map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton variant="text" width="80%" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTable;
