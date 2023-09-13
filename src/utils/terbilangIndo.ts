function terbilangLogic(n: number): string {
  if (n === 0) return "nol";

  const huruf: string[] = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];
  const belasan: string[] = [
    "",
    "sebelas",
    "dua belas",
    "tiga belas",
    "empat belas",
    "lima belas",
    "enam belas",
    "tujuh belas",
    "delapan belas",
    "sembilan belas",
  ];
  const ribuSatuan: string[] = ["", "ribu", "juta", "miliar", "triliun"]; // Add more as needed

  let result = "";
  let scaleIndex = 0;

  while (n > 0) {
    const part = n % 1000;

    if (part !== 0) {
      const ratusan = Math.floor(part / 100);
      const sisaRatusan = part % 100;

      if (ratusan > 0) {
        result = `${huruf[ratusan]} ratus ${result}`;
      }

      if (sisaRatusan > 0) {
        if (sisaRatusan < 10) {
          result = `${huruf[sisaRatusan]} ${result}`;
        } else if (sisaRatusan < 20) {
          result = `${belasan[sisaRatusan - 10]} ${result}`;
        } else {
          const puluhan = Math.floor(sisaRatusan / 10);
          const satuan = sisaRatusan % 10;
          result = `${huruf[puluhan]} puluh ${huruf[satuan]} ${result}`;
        }
      }

      if (scaleIndex > 0) {
        result = `${ribuSatuan[scaleIndex]} ${result}`;
      }
    }

    scaleIndex++;
    n = Math.floor(n / 1000);
  }

  return result.trim();
}

const terbilangIndo = (nominal: number) => {
  if (nominal === 0) return "nol";
  return terbilangLogic(nominal);
};

export default terbilangIndo;
