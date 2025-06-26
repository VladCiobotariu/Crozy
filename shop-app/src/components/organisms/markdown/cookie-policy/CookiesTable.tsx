"use client"

import { Sheet, styled } from "@mui/joy";
import { TableData } from ".";

type CookiesTableProps = {
  columns: string[];
  data: TableData[]
}

const StyledTable = styled("table")(({ theme }) => ({
  display: "block",
  width: "100%",
  [theme.breakpoints.down('md')]: {
      display: "block",
  },
  overflow: "auto"
}));

const StyledTableHead = styled("thead")(({ theme }) => ({
  tr: {
      td: {
          fontWeight: "bold",
          whiteSpace: "normal",
          [theme.breakpoints.down('md')]: {
              display: "block",
          },
      },
      [theme.breakpoints.down('md')]: {
      position: "absolute",
      top: "-9999px",
      left: "-9999px",
      }
  },

}));

const StyledTableBody = styled("tbody")(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
      display: "block",
  },

}));

const StyledTableRow = styled("tr")(({ theme }) => ({
  td: {
      fontWeight: "normal",
      whiteSpace: "normal",
  },
  [theme.breakpoints.down('md')]: {
      display: "block",
      margin: "0 0 5rem 0",
  },
  ":first-of-type": {
      td: {
          borderBottom: "1px solid rgba(224,224,224,0.8)",
      },
  },

}));

const StyledTableCell = styled("td")(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: "1px solid rgba(224,224,224,0.8)",
  [theme.breakpoints.down('md')]: {
      display: "block",
      position: "relative",
      paddingLeft: "40vw",
      maxWidth: "90vw",
      ":last-of-type": {
          borderBottom: "1px solid rgba(224,224,224,0.8)",
      },
      ":first-of-type": {
          borderTop: "1px solid rgba(224,224,224,0.8)",
      },
      ":before": {
          position: "absolute",
          left: "6px",
          width: "45%",
          whiteSpace: "nowrap",
          fontWeight: "bold",

      },
      ":nth-of-type(1)" : {
          ":before": {
              content: '"Nume"',
          }
      },
      ":nth-of-type(2)" : {
          ":before": {
              content: '"Furnizor"',
          }
      },
      ":nth-of-type(3)" : {
          ":before": {
              content: '"Categorie"',
          }
      },
      ":nth-of-type(4)" : {
          ":before": {
              content: '"Tip"',
          }
      },
      ":nth-of-type(5)" : {
          ":before": {
              content: '"Durata"',
          }
      },
      ":nth-of-type(6)" : {
          ":before": {
              content: '"Descriere"',
          }
      }
  },

}));

const CookiesTable = ({ columns, data}: CookiesTableProps) => {
  return(
    <>
      <Sheet sx={{
        overflow: "auto",
        minWidth: "500px"
      }}>
        <StyledTable>
          <StyledTableHead>
            <StyledTableRow>
              {columns.map(x=>(
                <th key={x}>{x}</th>
              ))}
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>
                  {row.provider}
                </StyledTableCell>
                <StyledTableCell>
                  {row.category}
                </StyledTableCell>
                <StyledTableCell>
                  {row.type}
                </StyledTableCell>
                <StyledTableCell>
                  {row.lifespan}
                </StyledTableCell>
                <StyledTableCell>
                  {row.description}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </Sheet>
    </>
  )
}

export default CookiesTable