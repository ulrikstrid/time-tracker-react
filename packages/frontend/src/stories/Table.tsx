import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "../primitives/Table";
import "../index.css";

type RowData = {
  task: string;
  date: string;
  from: string;
  to: string;
  total: string;
};

const rowDatas: RowData[] = [
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  },
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  },
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  },
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  },
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  },
  {
    task: "Some task",
    date: "jul 25e -17",
    from: "7:00",
    to: "12:00",
    total: "5"
  }
];

const rowDataToRow = (data: RowData) => {
  return (
    <Tr>
      <Td>
        {data.task}
      </Td>
      <Td>
        {data.date}
      </Td>
      <Td>
        {data.from}
      </Td>
      <Td>
        {data.to}
      </Td>
      <Td>
        {data.total}
      </Td>
    </Tr>
  );
};

storiesOf("primitives", module).add("Table", () => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th>Date</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Total</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rowDatas.map(rowDataToRow)}
      </Tbody>
    </Table>
  );
});
