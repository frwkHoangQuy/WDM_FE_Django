export function getFileBlobUrl(file) {
  if (!file) {
      console.error('No file provided.');
      return;
  }
  // Create a Blob URL from the file
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;

}

export function formatVND(number) {
  let result = number
  if (!result) {
    result = 0
  }
  return result.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });
}
