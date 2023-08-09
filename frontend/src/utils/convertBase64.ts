const convertToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString() as string;
      resolve(base64String);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
};

export default convertToBase64;
