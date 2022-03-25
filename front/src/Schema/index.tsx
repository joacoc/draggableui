import { Icon, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrResources } from "react-icons/gr";

const host = "http://localhost:4000/";

export default function Schema(): JSX.Element {
    const [sources, setSources] = useState([]);
    const [views, setViews] = useState([]);
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const asyncReq = async () => {

            const viewsEncodedQuery = `?raw_query=${encodeURIComponent("SHOW VIEWS;")}`;
            const sourcesEncodedQuery = `?raw_query=${encodeURIComponent("SHOW SOURCES;")}`;
            const tablesEncodedQuery = `?raw_query=${encodeURIComponent("SHOW TABLES;")}`;
            // const indexesEncodedQuery = `?raw_query=${encodeURIComponent("SHOW INDEXES;")}`;

            fetch(`${host}${viewsEncodedQuery}`).then((viewsRes) => {
                viewsRes.json().then(({ rows }) => setViews(rows)).catch(() => { })
            }).catch(() => { });
            fetch(`${host}${sourcesEncodedQuery}`).then((sourcesRes) => {
                sourcesRes.json().then(({ rows }) => setSources(rows)).catch(() => { })
            }).catch(() => { });
            fetch(`${host}${tablesEncodedQuery}`).then((tablesRes) => {
                tablesRes.json().then(({ rows }) => setTables(rows)).catch(() => { })
            }).catch(() => { });
        };

        asyncReq();
    }, []);


    // <Table >
    // AiOutlineThunderbolt
    return (
        <Table variant='simple' overflow={"scroll"}>
            <TableCaption>Schema</TableCaption>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Type</Th>
                </Tr>
            </Thead>
            <Tbody>
                {sources.map((source) => <Tr key={source}><Td>{source.name}</Td><Td> <Icon as={GrResources} w={4} h={4} /></Td></Tr>)}
                {views.map((view) => <Tr key={view}><Td>{view.name}</Td><Td> <Icon as={GrResources} w={4} h={4} /></Td></Tr>)}
                {tables.map((table) => <Tr key={table}><Td>{table.name}</Td><Td> <Icon as={GrResources} w={4} h={4} /></Td></Tr>)}
            </Tbody>
        </Table>
    )
}