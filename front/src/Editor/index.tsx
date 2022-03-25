import { Box, Button } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import "./codemirror.css";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/sql/sql";

interface Props {
  handleResults: (rows?: [any], error?: any) => void;
}

export default function Editor(props: Props): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();

  const { handleResults } = props;

  const onClick = useCallback(() => {
    setLoading(true);

    const asyncReq = async () => {

      const encodedQuery = `?raw_query=${encodeURIComponent(query)}`;

      try {
        const res = await fetch(`http://localhost:4000/${encodedQuery}`);
        const parsedJson = await res.json();

        handleResults(parsedJson);
      } catch (err) {
        handleResults(undefined, err);
      } finally {
        setLoading(false);
      }
    };

    asyncReq();
  }, [handleResults, query]);

  const onBeforeChange = useCallback((editor, data, value) => {
    setQuery(value);
  }, []);

  return (
    <Box
      height="100%"
      width={"100%"}
      overflow={"hidden"}
      position="fixed"
    >
      <Button
        height="1.75rem"
        size="sm"
        onClick={onClick}
        position="absolute"
        disabled={loading}
        zIndex={10}
        top={2}
        right={2}
      >
        Run
      </Button>
      <CodeMirror
        value={query}
        onBeforeChange={onBeforeChange}
        options={{
          mode: "text/x-pgsql",
          theme: "material",
          lineNumbers: true,
        }}
      />
    </Box>
  );
}
