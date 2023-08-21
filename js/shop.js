let total = 0;
let discount = 0;

function itemInfo(data) {
  //set item
  const itemName =
    data.parentNode.childNodes[5].childNodes[3].childNodes[3].innerText;

  const selectedItems = document.getElementById("selected-items");
  const count = selectedItems.childElementCount;
  const p = document.createElement("p");
  p.innerHTML = `${count}. ${itemName}`;
  selectedItems.appendChild(p);

  //   set price
  const priceString =
    data.parentNode.childNodes[5].childNodes[3].childNodes[5].childNodes[0]
      .innerText;

  const price = parseFloat(priceString);
  total = total + price;
  const makePurchaseBtn = document.getElementById("make-purchase-btn");
  const applyBtn = document.getElementById("apply-btn");

  //   enable purchase button
  if (total > 0) {
    makePurchaseBtn.removeAttribute("disabled");
  }

  //   enable coupon apply button
  if (total > 200) {
    applyBtn.removeAttribute("disabled");
  }

  document.getElementById("total-price").innerText = total.toFixed(2);

  // get coupon code  from coupon field

  document.getElementById("apply-btn").addEventListener("click", function () {
    const couponCode = document.getElementById("coupon-field").value;
    if (couponCode === "SELL200") {
      const percentage = (total / 200) * 100;

      const discountFieldString = (document.getElementById(
        "discount-amount"
      ).innerText = parseFloat(percentage).toFixed(2));

      const previousGroundTotalString =
        document.getElementById("grand-total").innerText;
      const groundTotalFloat = parseFloat(previousGroundTotalString);
      const groundTotal = total - discountFieldString;
      document.getElementById("grand-total").innerText = groundTotal.toFixed(2);

      //make purchase
      document.getElementById("go-back").addEventListener("click", function () {
        document.getElementById("grand-total").innerText = "";
        document.getElementById("coupon-field").value = "";
        p.innerText = "";
        document.getElementById("total-price").innerText = "";
        document.getElementById("discount-amount").innerText = "";
      });
    } else {
      alert("Invalid Coupon");
      document.getElementById("coupon-field").value = "";
      p.innerText = "";
      document.getElementById("total-price").innerText = "";
      document.getElementById("discount-amount").innerText = "";
      document.getElementById("grand-total").innerText = "";
    }
  });
}
