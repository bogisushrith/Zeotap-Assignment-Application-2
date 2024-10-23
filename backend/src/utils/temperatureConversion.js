const convertTemperature = (kelvin, scale) => {
    if (kelvin < 0) return kelvin; // Prevent negative values (already in Celsius or Fahrenheit)
    if (scale === 'Celsius') return kelvin - 273.15;
    if (scale === 'Fahrenheit') return (kelvin - 273.15) * 9/5 + 32;
    return kelvin; // Kelvin as default
};

module.exports = { convertTemperature };
