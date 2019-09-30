export function loadSelectedFile(
  file: File,
  cb: (event: any, filename: string) => void
) {
  const reader = new FileReader();
  reader.onerror = ex => {
    // FIXME
    console.log(ex);
  };
  reader.onload = (e: any) => {
    cb(e, file.name);
  };
  reader.readAsArrayBuffer(file);
}
