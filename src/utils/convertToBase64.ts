const convertToBase64: (file: File) => Promise<string> = async (file: File) => {
  return new Promise<string>(resolve => {
    // Make new FileReader
    const reader = new FileReader();
    // Convert the file to base64 text
    reader.readAsDataURL(file);
    // on reader load somthing...
    reader.onload = () => {
      const baseURL = reader.result;
      resolve(baseURL as string);
    };
  });
};

export default convertToBase64;
