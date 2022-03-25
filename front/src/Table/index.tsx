import React from "react";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import styled from "styled-components";

const Styles = styled.div`
  padding-rigth: 1rem;
  .td {
    max-width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 300;
  }
  .table {
    display: inline-block;
    border-spacing: 0;
    overflow: scroll;

    .th {
      font-weight: 600;
    }
    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
    }
  }
`;

interface Props {
  columns: Array<any>;
  rows: Array<any>;
}

export default function Table({ columns, rows: data }: Props) {
  // console.log(rawColumns)
  // const { width } = useWindowDimensions();

  const defaultColumn = React.useMemo(
    () => ({
      width: 150,
      maxWidth: 150,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    }),
    []
  );

  // // const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  console.log('Columnas in table: ', columns)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <div {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <Styles>
      <div {...getTableProps()} className="table">
        <div>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={1000}
            itemCount={rows.length}
            itemSize={35}
            width={totalColumnsWidth}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </div>
    </Styles>
  );
}
