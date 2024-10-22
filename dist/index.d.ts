import type { Table } from "@tanstack/react-table";
/**============
 * @description Export Excel with Merged Cells
 * =============
 * */
export default function exportExcelJs(tables: Table<any>[], // 여러 테이블을 받을 수 있도록 수정
filename: string, applyFilters?: boolean, layout?: "horizontal" | "vertical", // 가로/세로 배치 방식 선택
sheetName?: string): Promise<void>;
