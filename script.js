function calculateFluidRequirement() {
    const weight = parseFloat(document.getElementById('weight').value);
    const dayOfLife = parseInt(document.getElementById('dayOfLife').value);
    const isSick = document.getElementById('sick').value === 'yes';
    const interval = parseInt(document.getElementById('interval').value);
    let fluidRequirementPerKg = 0;
    let totalFluidRequirement = 0;

    if (weight < 1.5) {
        fluidRequirementPerKg = 80 + (dayOfLife - 1) * 20;
    } else {
        fluidRequirementPerKg = 60 + (dayOfLife - 1) * 20;
    }

    // Limit the fluid requirement to 180 mL/kg/day
    if (fluidRequirementPerKg > 180) {
        fluidRequirementPerKg = 180;
    }

    totalFluidRequirement = weight * fluidRequirementPerKg;

    if (isSick && dayOfLife > 1) {
        // Electrolyte addition for sick babies
        const sodiumChloride = 19 * weight; // NaCl in mL
        const potassiumChloride = 1 * weight; // KCl in mmol
        const dextroseVolume = totalFluidRequirement - sodiumChloride;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Total Fluid Requirement: ${totalFluidRequirement.toFixed(2)} mL/day</p>
            <p>NaCl (Sodium Chloride): ${sodiumChloride.toFixed(2)} mL/day</p>
            <p>KCl (Potassium Chloride): ${potassiumChloride.toFixed(2)} mmol/day</p>
            <p>D10 (Dextrose): ${dextroseVolume.toFixed(2)} mL/day</p>
            <p>Fluid Requirement per Feeding: ${(totalFluidRequirement / (24 / interval)).toFixed(2)} mL</p>
        `;
    } else {
        const feedingsPerDay = 24 / interval;
        const fluidPerFeeding = totalFluidRequirement / feedingsPerDay;

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <p>Total Fluid Requirement: ${totalFluidRequirement.toFixed(2)} mL/day</p>
            <p>Fluid Requirement per Feeding: ${fluidPerFeeding.toFixed(2)} mL</p>
        `;
    }
}

function resetForm() {
    document.getElementById('calculatorForm').reset();
    document.getElementById('result').innerHTML = '';
}
