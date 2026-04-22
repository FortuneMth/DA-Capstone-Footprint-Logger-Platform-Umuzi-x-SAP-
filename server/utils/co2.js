function calculateCo2Kg(quantity, factor) {
  const normalizedQuantity = Number(quantity);
  const normalizedFactor = Number(factor);

  if (
    Number.isNaN(normalizedQuantity) ||
    Number.isNaN(normalizedFactor) ||
    normalizedQuantity < 0 ||
    normalizedFactor < 0
  ) {
    return 0;
  }

  return Number((normalizedQuantity * normalizedFactor).toFixed(2));
}

module.exports = {
  calculateCo2Kg,
};
