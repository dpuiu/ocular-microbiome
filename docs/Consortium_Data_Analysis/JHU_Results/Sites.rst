.. include:: header.rst

.. raw:: html

    <script>
    $(function () {
      $('table.docutils.align-default').each(function () {
        var $table = $(this);
    
        // Add row number column if it doesn't already exist
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
          $table.find('thead tr').prepend('<th>#</th>');
          $table.find('tbody tr').prepend('<td></td>');
        }
    
        var dt = $table.DataTable({
          dom: 'tBfipr',
          pageLength: -1,
          lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
    
          buttons: [
          'pageLength',
           { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)',  format: { body: function (data) { return $('<div>' + data + '</div>').text().replace(/,/g, '');}}}},
           { extend: 'colvis', text: 'Columns' }
          ],

          columnDefs: [
            {
              targets: 3,
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
    
                if ($.isNumeric(text)) {
                  return '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?command=show&mode=node&id=' +
                    text +
                    '" target="_blank" rel="noopener" title="NCBI Taxonomy">' +
                    text +
                    '</a>';
                }
                return data;
              }
            },
            {
               targets: [1],  
               visible: false
            }
          ],
          order: [[1, 'asc']]
        });
    
        // Update row numbers on draw, for current page only
        dt.on('draw.dt', function () {
          var info = dt.page.info();
          dt.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = info.start + i + 1;
          });
        });
    
        // Initial draw to fill row numbers immediately
        dt.draw();
      });
    });
    </script>    


Source
======

Conjunctiva
-----------

.. csv-table::
    :file: Conjunctiva.csv
    :header-rows: 1

Glabella
--------

.. csv-table::
    :file: Glabella.csv
    :header-rows: 1


Lid_margin
----------

.. csv-table::
    :file: Lid_margin.csv
    :header-rows: 1
