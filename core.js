function generateRandomJSON() {
  const product = {
    product_id: Math.floor(Math.random() * 1000),
    product_name: `Product ${Math.floor(Math.random() * 100)}`,
    price: (Math.random() * 1000).toFixed(2),
    in_stock: Math.random() < 0.8,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    brand: `Brand ${Math.floor(Math.random() * 10)}`,
  };

  const lineItems = [];
  const numLineItems = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numLineItems; i++) {
    lineItems.push(product);
  }

  return JSON.stringify({
    order_id: `ORDER_${Math.floor(Math.random() * 7874653434)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    boolean: Math.random() < 0.5,
    mobile: `+1-${Math.floor(Math.random() * 10000000000)}`,
    number: Math.floor(Math.random() * 100),
    date: getRandomDate(),
    url: `http://example.com/${Math.random().toString(36).substring(2)}`,
    products: lineItems
  });

  function getRandomDate() {
    const start = new Date(2023, 0, 1); // Start date (January 1, 2023)
    const end = new Date(2023, 11, 31); // End date (December 31, 2023)
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}

function show_alert(type='error',message,description,forever=false){
    let el = $('.tof-leaderboard-affiliate');
    el.find('.tof-affiliate-title').text(message);
    el.find('.tof-affiliate-des').text(description);
    el.find('img').attr('src',`/images/json-${type}.png`);
    el.removeClass('hide');
    if(!forever) setTimeout(function(){ el.addClass('hide'); }, 3000);
}
function checkJSON(json) {
  if (json === null || json == '') {
    return "empty";
  }
  if(/^-?\d*\.?\d+$/.test(json)){
    return 'invalid';
  }
  try {
    JSON.parse(json);
    if (Object.keys(json).length === 0) {
      return "empty";
    } else {
      return "valid";
    }
  } catch (e) {
    return "invalid";
  }
}
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date) && dateString === date.toISOString().split('T')[0];
}

function input_type(input) {
  const numberPattern = /^-?\d*\.?\d+$/;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const urlPattern = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;

  if (numberPattern.test(input)) {
    return "number";
  } else if (emailPattern.test(input)) {
    return "email";
  } else if (urlPattern.test(input)) {
    return "url";
  } else if (isValidDate(input)) {
    return "date";
  } else if (input === "true" || input === "false" || input === true || input === false) {
    return "boolean";
  } else {
    return "string";
  }
}
$(document).ready(function(){
    $('#copyResult').click(function(){
        let json = $("#tof-user-output").val();
        let el = $(this).find('span');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(json).then(function() {
                el.text('Copied');
              setTimeout(() => {
                el.text('Copy');
              }, 1000);
            }).catch(function(err) {
              console.error("Error copying text: ", err);
            });
        } else {
            let textArea = $("#tof-user-output")[0];
            textArea.select();
            textArea.setSelectionRange(0, 99999);
            document.execCommand("copy");
           el.text('Copied');
            setTimeout(() => {
              el.text('Copy');
            }, 1000);
        }
    })
})

