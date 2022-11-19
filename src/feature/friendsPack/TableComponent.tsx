import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { RatingComponent } from "./RatingComponent";
import TableSortLabel from "@mui/material/TableSortLabel/TableSortLabel";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  question: string,
  answer: string,
  lastUpdated: string,
  carbs: number
) {
  return {
    question,
    answer,
    lastUpdated,
    carbs,
  };
}

const rows = [
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "10.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "11.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "09.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "08.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "07.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "01.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "06.11.2022",
    1
  ),
  createData(
    "How This works in JavaScript?",
    "How This works in JavaScript?",
    "01.11.2022",
    1
  ),
];

export const TableComponent = () => {
  const style = {
    backgroundColor: "#c1bfbf",
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: "100%",
          margin: "20px auto",
          backgroundColor: "#f6f6f6",
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <TableCell style={style}>Question</TableCell>
            <TableCell style={style} align="center">
              Answer
            </TableCell>
            {/*<StyledTableCell>Question</StyledTableCell>*/}
            {/*<StyledTableCell align="center">Answer</StyledTableCell>*/}
            {/*<StyledTableCell align="right">*/}
            {/*  /!*Last Updated*!/*/}
            {/*  /!*s*!/*/}
            {/*</StyledTableCell>*/}
            <TableCell style={style} align="right">
              Last Updated
              <TableSortLabel
                sx={{ ml: "5px" }}
                active={true}
                IconComponent={ArrowDropDownIcon}
                direction={"desc"}
              ></TableSortLabel>
            </TableCell>
            <TableCell style={style} align="center">
              Grade
            </TableCell>
            {/*<StyledTableCell align="center">Grade</StyledTableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.question}>
              <StyledTableCell component="th" scope="row">
                {row.question}
              </StyledTableCell>
              <StyledTableCell align="right">{row.answer}</StyledTableCell>
              <StyledTableCell align="right">{row.lastUpdated}</StyledTableCell>
              <StyledTableCell align="right">
                <RatingComponent />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
