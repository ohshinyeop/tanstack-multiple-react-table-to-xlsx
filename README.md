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
import { drawExcelSheet } from "tanstack-multiple-react-table-to-xlsx";
```

2. Use the `useReactTable` hook to get the table data:

```javascript
const tableData = useReactTable(options);
const tableData2 = useReactTable(options);
```

3. Pass the `tableData` array to the `drawExcelSheet` function:

```javascript
drawExcelSheet([tableData, TableData2]);
```

4. You can create an excel sheet by placing multiple tables horizontally or vertically. Use the parameters layout

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
