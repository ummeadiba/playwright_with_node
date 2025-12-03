import ExcelJS from "exceljs";

export async function loadExcel(path: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);
  
  const sheet = workbook.worksheets[0];
  const rows: any[] = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const obj: any = {};
    sheet.getRow(1).eachCell((headerCell, colNum) => {
      obj[headerCell.value as string] = row.getCell(colNum).value;
    });

    rows.push(obj);
  });

  return rows;
}
