export const formatDate = (dateItem: string): string => {
  const date = new Date(dateItem);
  // 로컬 시간과 UTC 시간의 차이를 분 단위로 계산
  const offset = date.getTimezoneOffset() * 60000;
  // UTC 시간에 오프셋을 더하고, 한국 시간대(UTC+9)에 맞추기 위해 9시간(32400000밀리초)을 더함
  const kstDate = new Date(date.getTime() + offset + 32400000);
  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, "0");
  const day = kstDate.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};
