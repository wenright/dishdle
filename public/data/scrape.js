let rows = [];

$('.wikitable').each((i, e) => {
  $(e).find('tr').each((j, tr) => {
    if (j === 0) return;
    
    let cols = '';
    $(tr).find('td').each((k, td) => {
      if (k === 0) {
        // image
        if ($(td).find('img').length > 0) {
          let imgName = $(td).find('img').attr('src').replace(/.*\//gmi, '');
          imgName = imgName.replace(/\d+px/gmi, '300px')
          cols += imgName;
        } else {
          // No image found
        }
      }
      else {
        cols += '|' + $(td).text().replace(/\[.*\]|\n/gmi, '');
      }
    });

    rows.push(cols);
  });
});

console.log(rows.join('\n'));