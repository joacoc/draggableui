import { Box, Button } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import ReactGridLayout from "react-grid-layout";
import Editor from "../Editor";
import Schema from "../Schema";
import Table from "../Table";

interface State {
  rows: Array<any>;
  columns: Array<string>;
}

function columnCell() {
  return (cellData: any) => (
    <Box
      maxWidth={150}
      whiteSpace="nowrap"
      textOverflow={"ellipsis"}
      overflow={"hidden"}
      fontWeight={500}
    >
      {cellData.value}
    </Box>
  )
}

export default function GirdLayout(): JSX.Element {
  const [{ rows, columns }, setState] = useState<State>({ rows: [], columns: [] });
  const [drag, setDrag] = useState<boolean>(true);

  const handleResults = useCallback((results, error) => {
    if (error) {
      console.log(error);
    } else {
      const { rows, columns } = results;
      const tableColumns = (columns || []).map(column => ({
        Header: column,
        accessor: column,
        id: column,
        Cell: columnCell(),
      }));

      setState({
        rows: rows || [],
        columns: tableColumns
      });
    }
  }, []);

  return (
    <Box>
      <Button onClick={() => setDrag(!drag)} position="absolute" top={2} right={2}>
        {drag ? "Disable drag" : "Enable drag"}
      </Button>
      <ReactGridLayout
        className="layout"
        isBounded
        autoSize
        rowHeight={2}
        width={window.innerWidth}
        useCSSTransforms
        isResizable
        isDraggable={drag}
      >
        <Box
          borderY={"2px"}
          border={"2px"}
          key={"schema"}
          data-grid={{
            h: 60,
            i: "schema",
            w: 1,
            x: 0,
            y: 0,
          }}
          width="100%"
          overflow={"hidden"}
        >
          <Schema />
        </Box>
        <Box
          borderY={"2px"}
          border={"2px"}
          key={"editor"}
          data-grid={{
            h: 60,
            i: "editor",
            w: 5,
            x: 2,
            y: 0,
          }}
          width="100%"
        >
          <Editor handleResults={handleResults} />
        </Box>
        <Box
          borderY={"2px"}
          border={"2px"}
          key={"table"}
          data-grid={{
            h: 60,
            i: "table",
            w: 5,
            x: 1000,
            y: 0,
          }}
          overflow="hidden"
        >
          <Box overflow={"scroll"}>
            <Table columns={columns} rows={rows} />
          </Box>
        </Box>
      </ReactGridLayout>
    </Box>
  );
}
