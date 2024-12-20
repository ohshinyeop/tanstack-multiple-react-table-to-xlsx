"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exportExcelJs;
const exceljs_1 = require("exceljs");
const file_saver_1 = require("file-saver");
/**============
 * @description Export Excel with Merged Cells
 * =============
 * */
function exportExcelJs(tables_1, filename_1) {
    return __awaiter(this, arguments, void 0, function* (tables, // 여러 테이블을 받을 수 있도록 수정
    filename, applyFilters = true, layout = "vertical", // 가로/세로 배치 방식 선택
    sheetName = "Sheet 1") {
        const wb = new exceljs_1.Workbook();
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
                .map((header) => header.column.columnDef.header);
            // 헤더를 가로/세로 배치에 맞게 추가
            headers.forEach((header, index) => {
                if (typeof header === "string") {
                    ws.getRow(currentRow).getCell(currentCol + index).value = header;
                    ws.getRow(currentRow).getCell(currentCol + index).font = { bold: true };
                }
                else {
                    console.error("Header is not a string", header);
                }
            });
            currentRow++; // 데이터가 시작될 행
            // 데이터 생성
            const exportRows = applyFilters
                ? table.getFilteredRowModel().rows
                : table.getCoreRowModel().rows;
            exportRows.forEach((row, rowIndex) => {
                const cells = row.getVisibleCells().filter((cell) => {
                    return !cell.column.columnDef.enableHiding;
                });
                cells.forEach((cell, index) => {
                    var _a;
                    const cellValue = (_a = cell.getValue()) !== null && _a !== void 0 ? _a : "";
                    const cellRef = ws.getRow(currentRow).getCell(currentCol + index);
                    cellRef.value = cellValue;
                    // 가로 병합: 이전 행과 동일한 값일 경우 셀 병합
                    const prevRowCell = ws
                        .getRow(currentRow - 1)
                        .getCell(currentCol + index);
                    if (rowIndex > 0 &&
                        prevRowCell.value === cellValue &&
                        !prevRowCell.isMerged) {
                        ws.mergeCells(currentRow - 1, currentCol + index, currentRow, currentCol + index);
                    }
                });
                currentRow++;
            });
            // 세로 병합: 동일한 열의 값이 모두 같을 경우 셀 병합
            for (let colIndex = 0; colIndex < headers.length; colIndex++) {
                let startRow = 2; // 데이터 시작 행 (헤더 다음)
                let lastValue = ws.getRow(startRow).getCell(currentCol + colIndex).value;
                for (let rowIndex = startRow + 1; rowIndex <= currentRow - 1; rowIndex++) {
                    const currentValue = ws
                        .getRow(rowIndex)
                        .getCell(currentCol + colIndex).value;
                    if (currentValue !== lastValue || rowIndex === currentRow - 1) {
                        // 병합되지 않은 셀만 병합
                        if (rowIndex - startRow > 1 &&
                            !ws.getRow(startRow).getCell(currentCol + colIndex).isMerged) {
                            ws.mergeCells(startRow, currentCol + colIndex, rowIndex - 1, currentCol + colIndex);
                        }
                        lastValue = currentValue;
                        startRow = rowIndex;
                    }
                }
            }
            // 테이블 간 간격 추가 (세로 배치일 경우)
            if (layout === "vertical") {
                currentRow++; // 테이블 간에 한 줄 띄움
            }
            else if (layout === "horizontal") {
                currentCol += headers.length + 2; // 가로로 이동, 테이블 간에 두 칸 띄움
                currentRow = 1; // 가로 배치이므로 행을 다시 첫 줄로 이동
            }
        }
        // 엑셀 파일 생성 및 다운로드
        const buf = yield wb.xlsx.writeBuffer();
        (0, file_saver_1.saveAs)(new Blob([buf]), `${filename}.xlsx`);
    });
}
