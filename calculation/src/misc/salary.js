export function calculateSalary(
  cases,
  userOklad,
  userId,
  minBonus = 1000,
  maxBonus = 2500
) {
  let moneyOfROZP = 0;
  let myActualMoney = 0;
  let myBonus = 0;
  const baseOklad = userOklad || 476.44;

  myActualMoney += baseOklad;

  cases?.forEach((el) => {
    if (el.isPaid && !el.isDeleted) {
      moneyOfROZP += el.expenses * 0.7;

      let thoseMoney = ((el.expenses * 0.3) / el.takes) * el.myTakes;
      let thoseMoneyAfterTaxes = thoseMoney - thoseMoney * 0.14; // Deducting 14% taxes
      myBonus += thoseMoney; // Add the bonus before taxes to the bonus total
      myActualMoney += thoseMoneyAfterTaxes;
    }
  });

  // Calculating KPI bonus based on the coefficient
  let coefficient = (
    ((myBonus - minBonus) / (maxBonus - minBonus)) *
    100
  ).toFixed(2);
  if (coefficient < 0) coefficient = 0;
  if (coefficient > 100) coefficient = 100;

  const KPIBonus = (calculateKPIBonus(coefficient) * myBonus).toFixed(2);
  const KPIAfterTaxes = KPIBonus * 0.86;

  myActualMoney += parseFloat(KPIAfterTaxes);

  // Ensure the salary does not go below a minimum threshold
  if (myActualMoney < 538.36) {
    myActualMoney = 538.36;
  }

  return {
    finalCut: (myActualMoney - 150).toFixed(2),
    moneyOfROZP: moneyOfROZP.toFixed(2),
    myBonus: myBonus.toFixed(2),
    myPureMoney: myActualMoney.toFixed(2),
    coefficientString: `${coefficient}%`,
    KPIAfterTaxes: KPIAfterTaxes.toFixed(2),
  };
}

function calculateKPIBonus(percentage) {
  if (percentage >= 50 && percentage <= 59) {
    return 0.01;
  } else if (percentage >= 60 && percentage <= 69) {
    return 0.02;
  } else if (percentage >= 70 && percentage <= 79) {
    return 0.03;
  } else if (percentage >= 80 && percentage <= 89) {
    return 0.04;
  } else if (percentage >= 90) {
    return 0.05;
  } else {
    return 0;
  }
}
