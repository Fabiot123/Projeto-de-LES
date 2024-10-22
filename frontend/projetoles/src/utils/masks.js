export function cpfMask(val) {
  return val
    .replace(/[^0-9.-]/g, "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .slice(0, 14);
}

export function telMask(val, type) {
  const cleanVal = val.replace(/[^0-9-]/g, "").replace(/\D/g, "");

  if (type == "Fixo") {
    return cleanVal.replace(/(\d{4})(\d)/, "$1-$2").slice(0, 9);
  }

  return cleanVal.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 10);
}

export function dddMask(val) {
  return val.replace(/[^0-9]/g, "").slice(0, 2);
}

export function cvvMask(val) {
  return val.replace(/[^0-9]/g, "").slice(0, 3);
}

export function cepMask(val) {
  return val
    .replace(/[^0-9]/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

export function dtvalMask(val) {
  return val
    .replace(/[^0-9/]/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .slice(0, 5);
}

export function cardMask(val) {
  return val
    .replace(/\D/g, "")
    .replace(/(\d{4})(\d)/g, "$1 $2")
    .slice(0, 19);
}
