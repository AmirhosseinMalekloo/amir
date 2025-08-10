// PriceCalc: live calculation and download quote
(function(){
  function qs(sel){ return document.querySelector(sel); }
  function qAll(sel){ return document.querySelectorAll(sel); }
  var pages = qs('#pages'), complexity = qs('#complexity'), shop = qs('#shop'), seo = qs('#seo'), cms = qs('#cms');
  var basePerPage = 100;
  function calc(){
    var p = Math.max(1, parseInt(pages.value||1));
    var mult = parseFloat(complexity.value||1);
    var extras = (shop.checked?parseFloat(shop.value):0) + (seo.checked?parseFloat(seo.value):0) + (cms.checked?parseFloat(cms.value):0);
    var total = Math.round((p * basePerPage * mult) + extras);
    qs('#total-price').textContent = '$' + total;
    qs('#base-price').textContent = '$' + basePerPage;
    return {pages:p, complexity:mult, extras:extras, total:total};
  }
  document.addEventListener('input', calc);
  document.addEventListener('change', calc);
  qs('#download-quote').addEventListener('click', function(){
    var data = calc();
    var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = 'price-quote.json'; a.click();
    URL.revokeObjectURL(url);
  });
  // initial
  calc();
})();
