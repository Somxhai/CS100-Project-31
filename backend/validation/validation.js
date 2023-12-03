const spaceBetween = (str) => {
  const regex = /^(\S+\s{1}\S+)$/;
  return regex.test(str);
};

function nameValidation(name) {
  if (!name) return { result: "", ok: false };
  if (spaceBetween(name)) return { result: name, ok: true };
}
