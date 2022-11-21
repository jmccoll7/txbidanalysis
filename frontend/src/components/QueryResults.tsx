import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useGetItemsQuery, useQueryItemsQuery } from "../gql/graphql";

interface QueryResultsProps {
  searchInput?: string;
  itemCode?: number;
  startDate?: Date;
  endDate?: Date;
  type: string;
}

interface QueryResultsColumns {
  column1: string;
  column2: string;
  column3: string;
}

export const QueryResults: React.FC<QueryResultsProps> = ({
  searchInput = "",
  type,
  itemCode = 0,
  startDate = new Date("2000-01-01"),
  endDate = new Date("2000-02-01"),
}) => {
  const { data: itemSearchData } = useGetItemsQuery({
    variables: { searchInput },
  });
  const { data: queryItemsData } = useQueryItemsQuery({
    variables: { itemCode, startDate, endDate },
  });
  const isItemSearch = type === "itemSearch";
  const isQuery = type === "query";
  const itemList = isItemSearch
    ? itemSearchData?.items
    : isQuery
    ? queryItemsData?.queryItems
    : null;

  console.log(itemList);

  const columnNames: QueryResultsColumns = {
    column1: isItemSearch ? "ITEMCODE" : isQuery ? "UNIT PRICE" : "",
    column2: isItemSearch ? "ITEM DESCRIPTION" : isQuery ? "CONTRACTOR" : "",
    column3: isItemSearch ? "UNIT OF MEASUREMENT" : isQuery ? "BID DATE" : "",
  };
  return (
    <>
      {!itemList ? null : itemList.length == 0 ? (
        <Text p={6} textAlign={"center"}>
          No results found.
        </Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{columnNames.column1}</Th>
                <Th>{columnNames.column2}</Th>
                <Th>{columnNames.column3}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemList.map((item, index) =>
                !item ? null : (
                  <Tr key={isItemSearch ? (item as any).item_code : index}>
                    <Td>
                      {isItemSearch
                        ? (item as any).item_code
                        : (item as any).unitPrice}
                    </Td>
                    <Td>
                      {isItemSearch
                        ? (item as any).item_description
                        : (item as any).contractor}
                    </Td>
                    <Td>
                      {isItemSearch
                        ? (item as any).item_unit
                        : (item as any).bidDate}
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
