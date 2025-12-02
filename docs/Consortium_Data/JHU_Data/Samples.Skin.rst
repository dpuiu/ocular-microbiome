.. raw:: html

    <meta name="google-site-verification" content="e2LnwrGlv397RPlrT8ckb-yVwcPyZaGyADcmCFv63y4" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.colVis.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X904V344P"></script>
    <script>
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', 'G-9X904V344P');
    </script>

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
                pageLength: 10,
                lengthMenu: [[ 10, 50, -1], [10, 50, "All"]],

                buttons: [
                    'pageLength',
                    { 
                        extend: 'csv', 
                        text: 'Save', 
                        exportOptions: { 
                            columns: ':not(:first-child)',  
                            format: { 
                                body: function (data) { 
                                    return $('<div>' + data + '</div>').text().replace(/,/g, '');
                                }
                            }
                        }
                    },
                    { extend: 'colvis', text: 'Columns' }
                ],

                columnDefs: [
                   {
                     	targets: 1,
                        render: function (data, type, row, meta) {
                            var text = $('<div>' + data + '</div>').text().trim();
                            return '<p id="' + text + '">' + text + '</p>';
                        }
                    },
                    {
                        targets: [3,5],
                        render: function (data, type, row, meta) {
                            var text = $('<div>' + data + '</div>').text().trim();
                            if ($.isNumeric(text)) {
                                return Number(text).toLocaleString();
                            }
                            return data;
                        }
                    },
                    {         
                        targets: 4,
                        render: function (data, type, row, meta) {
                            var text = $('<div>' + data + '</div>').text().trim();
                            var ndata = row[2];
                            var ntext = $('<div>' + ndata + '</div>').text().trim();

                            if ($.isNumeric(text)) {
                                return '<a href="https://data.idies.jhu.edu/OcularMicrobiome/Consortium_data/JHU/' + ntext + '.unmapped.fasta.gz"' +
                                    ' download title="click to download non-human read FASTQ.GZ file">' +
                                    Number(text).toLocaleString()  +
                                    '</a>';
                            }
                            return data;
                        }
                    },

 	           {
		       targets: [7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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

Samples: Skin
=============

.. csv-table::
    :file: Samples.Skin.csv
    :header-rows: 1
	
