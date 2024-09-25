# tanstack-multiple-react-table-to-xlsx

This utility allows you to draw an Excel sheet by receiving the `useReactTable` object from `tanstack/react-table` as an array.

## Features

One of the key features of `tanstack-multiple-react-table-to-xlsx` is the ability to draw multiple `tanstack` tables in a single Excel sheet, either horizontally or vertically. This allows you to organize and present your data in a convenient and visually appealing way.

## Installation

To install `tanstack-multiple-react-table-to-xlsx`, run the following command:

```shell
yarn add tanstack-multiple-react-table-to-xlsx
```

## Usage

1. Import the necessary dependencies:

```javascript
import { useReactTable } from "tanstack/react-table";
import exportExcelJs from "tanstack-multiple-react-table-to-xlsx";
```

2. Use the `useReactTable` hook to get the table data:

```javascript
const firstTable = useReactTable({
  data: firstData,
  columns: firstColumns,
  getCoreRowModel: getCoreRowModel(),
});
const secondTable = useReactTable({
  data: secondData,
  columns: secondColumns,
  getCoreRowModel: getCoreRowModel(),
});

const tables = [firstTable, secondTable];
```

3. Pass the `tables` array to the `exportExcelJs` function:

```javascript
<Button
  className="w-fit flex gap-2 items-center h-full px-3 py-1"
  size={"sm"}
  onClick={() => {
    exportExcelJs(
      tables,
      `Part & Equipment Summary_${moment().format("YYYYMMDD_HHmmss")}`,
      true,
      "horizontal",
      "Summary"
    );
  }}
>
  <SaveAltIcon fontSize="small"> </SaveAltIcon>
  Excel
</Button>
```

4. You can create an excel sheet by placing multiple tables horizontally or vertically. Use the parameters `layout`

```javascript
export default async function exportExcelJs(
  tables: Table<any>[],
  filename: string,
  applyFilters = true,
  layout: "horizontal" | "vertical" = "vertical",
  sheetName = "Sheet1"
) {}
```

This will generate an Excel sheet based on the table data.

Note: Make sure you have the required dependencies installed and configured before using this utility.
