import xlsx from 'xlsx';

export function loadSelectedFile(file: File, cb: (event: any, filename: string) => void) {
  const reader = new FileReader();
  reader.onerror = (ex) => {
    // FIXME
    console.log(ex);
  };
  reader.onload = (e: any) => {
    cb(e, file.name);
  };
  reader.readAsArrayBuffer(file);
}

export function getFirstWorkSheetFromRawFile(rawFile: ArrayBuffer): xlsx.WorkSheet {
  const content = new Uint8Array(rawFile);
  const workbook = xlsx.read(content, { type: 'array' });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return firstSheet;
}
