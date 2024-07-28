const unitPrice = [
  {
    minUnit: 0,
    maxUnit: 100,
    vizAakaar: 4.71,
    isa: 0.45,
  },
  {
    minUnit: 101,
    maxUnit: 300,
    vizAakaar: 10.29,
    isa: 0.8,
  },
  {
    minUnit: 301,
    maxUnit: 500,
    vizAakaar: 14.55,
    isa: 1.1,
  },
  {
    minUnit: 501,
    maxUnit: 1000,
    vizAakaar: 16.64,
    isa: 1.15,
  },
  {
    minUnit: 1000,
    vizAakaar: 16.64,
    isa: 1.15,
  },
];

const baseUnits = 100;
const vahanAakaarPrice = 1.17;

const getUnitPrice = (units) => {
  for (const price of unitPrice) {
    if (units >= price.minUnit && (units <= price.maxUnit || !price.maxUnit)) {
      return {
        totalVizAakaar: Number((units * price.vizAakaar).toFixed(2)),
        totalIsa: Number((units * price.isa).toFixed(2)),
      };
    }
  }
  return null;
};

const calculateBill = (units, sthirAakaar) => {
  const extraUnits = units - baseUnits;
  // Get unit price for base units
  const totalBaseUnitsCharges = getUnitPrice(baseUnits);

  // Get unit price for extra units
  const totalExtraUnitCharges = getUnitPrice(extraUnits);
  const totalFinalVizAakaar = Number(
    (
      totalBaseUnitsCharges.totalVizAakaar +
      totalExtraUnitCharges.totalVizAakaar
    ).toFixed(2)
  );
  document.getElementById("td-viz-aakaar").innerText =
    totalFinalVizAakaar + "/-";

  //Vahan Aakaar
  const totalVahanAakaar = Number((units * vahanAakaarPrice).toFixed(2));
  document.getElementById("td-vahan-aakaar").innerText =
    totalVahanAakaar + "/-";

  //Indhan samayojan aakaar
  const totalIsa = Number(
    (totalBaseUnitsCharges.totalIsa + totalExtraUnitCharges.totalIsa).toFixed(2)
  );
  document.getElementById("td-isa-aakaar").innerText = totalIsa + "/-";

  //Viz Shulk
  const totalSumOFAllCharges = Number((Number(sthirAakaar)+totalFinalVizAakaar+totalVahanAakaar+totalIsa).toFixed(2));
  const totalVizShulk = Number((totalSumOFAllCharges * 16 / 100).toFixed(2));
  document.getElementById("td-viz-shulk").innerText = totalVizShulk + "/-";
 
  // Total payable
  const totalPayable = (totalSumOFAllCharges + totalVizShulk).toFixed(2);
  console.log(totalPayable)
  document.getElementById("td-total-payable").innerText = totalPayable + "/-";
};

const handleClick = () => {
  const units = document.getElementById("units").value;
  const sthirAakaar = document.getElementById("sthir_aakaar").value;
  document.getElementById("td-sthir-aakaar").innerText = sthirAakaar + "/-";
  calculateBill(units, sthirAakaar);
};

document
  .getElementById("calculate-bill")
  .addEventListener("click", handleClick);
