export function pad(n) {
  if (n <= 9)
    return `0${n}`
  return n
}

export function validateCardExpirationDate([month, year]) {
  if (month && year) {
    // Get last day of selected month and year.
    const date = new Date(year, month + 1, 0, 23, 59, 0, 0);
    return new Date() < date;
  }
  return true;
}

const defaultNumberValidation = minLength => number => new RegExp(`^\\d{${minLength}}$`).test(number)
const defaultCVVValidation = (minLength = 3, maxLength = 4) => number => new RegExp(`^\\d{${minLength},${maxLength}}$`).test(number)
const defaultCardFormat = number => [...number.match(/(.{0,4})/g)].slice(0, -1).join(' ')
export const cardTypes = [{
  key: 'visa',
  logo: <img width="110" src="logos/visa.png" alt="Visa" />,
  checkBIN: number => '4' === number.charAt(0),
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'maestro',
  logo: <img width="110" src="logos/maestro.png" alt="Maestro" />,
  checkBIN: number => '50' === number.slice(0, 2) || (56 <= parseInt(number.slice(0, 2)) && 58 >= parseInt(number.slice(0, 2))) ||
    '6' === number.charAt(0),
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'mastercard',
  logo: <img width="130" src="logos/mastercard.png" alt="MasterCard" />,
  checkBIN: number => (2221 <= parseInt(number.slice(0, 4)) && 2720 >= parseInt(number.slice(0, 4))) ||
    (51 <= parseInt(number.slice(0, 2)) && 55 >= parseInt(number.slice(0, 2))),
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'american-express',
  logo: <img width="110" src="logos/american-express.png" alt="American Express" />,
  checkBIN: number => ['34', '37'].indexOf(number.slice(0, 2)) >= 0,
  minLength: 15,
  maxLength: 15,
  maxColumns: 2,
  format: number => [...number.match(/^(.{0,4})(.{0,6})(.{0,5})$/)].slice(1).join(' '),
  validateNumbers: defaultNumberValidation(15),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'diners-club-international',
  logo: <img width="110" src="logos/diners-club.png" alt="Diners Club International" />,
  checkBIN: number => '36' === number.slice(0, 2),
  minLength: 14,
  maxLength: 14,
  maxColumns: 2,
  format: number => [...number.match(/^(.{0,4})(.{0,6})(.{0,4})$/)].slice(1).join(' '),
  validateNumbers: defaultNumberValidation(14),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'discover',
  logo: <img width="110" src="logos/discover.png" alt="Discover" />,
  checkBIN: number => '6011' === number.slice(0, 4) || (622126 <= parseInt(number.slice(0, 6)) && 622925 >= parseInt(number.slice(0, 6))) ||
    (644 <= parseInt(number.slice(0, 3)) && 649 >= parseInt(number.slice(0, 3))) || '110' === number.slice(0, 2),
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}, {
  key: 'jcb',
  logo: <img width="110" src="logos/jcb.png" alt="JCB" />,
  checkBIN: number => 3528 <= parseInt(number.slice(0, 4)) && 3589 >= parseInt(number.slice(0, 4)),
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}, {
  // Fallback/yet unknown card type.
  key: '0',
  logo: null,
  checkBIN: () => true,
  minLength: 16,
  maxLength: 16,
  maxColumns: 3,
  format: defaultCardFormat,
  validateNumbers: defaultNumberValidation(16),
  validateCVV: defaultCVVValidation(),
}]
