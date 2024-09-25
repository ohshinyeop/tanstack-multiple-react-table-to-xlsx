import type { Table } from "@tanstack/react-table";
import { CellValue, Workbook } from "exceljs";
import { saveAs } from "file-saver";

/**============
 * @description Export Excel
 * =============
 * */

export default async function exportExcelJs(
  tables: Table<any>[],
  filename: string,
  applyFilters = true,
  layout: "horizontal" | "vertical" = "vertical", // 가로/세로 배치 방식 선택
  sheetName = "Sheet1"
) {
  const wb = new Workbook();
  const ws = wb.addWorksheet(sheetName);

  let currentRow = 1;
  let currentCol = 1;

  for (const table of tables) {
    const lastHeaderGroup = table.getHeaderGroups().slice(-1)[0];
    if (!lastHeaderGroup) {
      console.error("No header groups found for table", table);
      continue;
    }

    // 테이블 헤더 생성
    const headers = lastHeaderGroup.headers
      .filter((h) => h.column.getIsVisible())
      .filter((h) => !h.column.columnDef.enableHiding)
      .map((header) => header.column.columnDef.header as string);

    // 헤더를 가로/세로 배치에 맞게 추가
    headers.forEach((header, index) => {
      ws.getRow(currentRow).getCell(currentCol + index).value = header;
      ws.getRow(currentRow).getCell(currentCol + index).font = { bold: true };
    });

    currentRow++; // 데이터가 시작될 행

    // 데이터 생성
    const exportRows = applyFilters
      ? table.getFilteredRowModel().rows
      : table.getCoreRowModel().rows;

    exportRows.forEach((row) => {
      const cells = row.getVisibleCells().filter((cell) => {
        return !cell.column.columnDef.enableHiding;
      });
      cells.forEach((cell, index) => {
        ws.getRow(currentRow).getCell(currentCol + index).value =
          (cell.getValue() as CellValue) ?? "";
      });
      currentRow++;
    });

    // 테이블 간 간격 추가 (세로 배치일 경우)
    if (layout === "vertical") {
      currentRow++; // 테이블 간에 한 줄 띄움
    } else if (layout === "horizontal") {
      currentCol += headers.length + 2; // 가로로 이동, 테이블 간에 두 칸 띄움
      currentRow = 1; // 가로 배치이므로 행을 다시 첫 줄로 이동
    }
  }

  // 엑셀 파일 생성 및 다운로드
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), `${filename}.xlsx`);
}
