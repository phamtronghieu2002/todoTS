function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
  
    const year = date.getFullYear().toString().slice(2); // lấy 2 số cuối của năm
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // thêm số 0 ở đầu nếu cần
    const day = date.getDate().toString().padStart(2, '0'); // thêm số 0 ở đầu nếu cần
    const hours = date.getHours().toString().padStart(2, '0'); // thêm số 0 ở đầu nếu cần
    const minutes = date.getMinutes().toString().padStart(2, '0'); // thêm số 0 ở đầu nếu cần
  
    // ghép chuỗi để có định dạng "yy/mm/dd - HH:MM"
    return `${year}/${month}/${day} - ${hours}:${minutes}`;
}

export { formatDate };
