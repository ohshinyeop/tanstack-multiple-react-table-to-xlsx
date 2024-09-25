import type { Table } from "@tanstack/react-table";
/**============
 * @description Export Excel
 * =============
 * */
export default function exportExcelJs(tables: Table<any>[], filename: string, applyFilters?: boolean, layout?: "horizontal" | "vertical", // 가로/세로 배치 방식 선택
sheetName?: string): Promise<void>;
