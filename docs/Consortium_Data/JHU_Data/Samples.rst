.. raw:: html

    <meta name="google-site-verification" content="e2LnwrGlv397RPlrT8ckb-yVwcPyZaGyADcmCFv63y4" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.4.1/css/buttons.dataTables.min.css">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.colVis.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.4.1/js/buttons.html5.min.js"></script>

    <script>
    $(function () {
    $('table.docutils.align-default').each(function () {
        var $table = $(this);

        // Add row number column if needed
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
            $table.find('thead tr').prepend('<th>#</th>');
            $table.find('tbody tr').prepend('<td></td>');
        }

        var dt = $table.DataTable({
            dom: 'tBfipr',
            pageLength: 5,
            order: [[1, 'asc']],
            columnDefs: [
                {
                    targets: 1,
                    render: function (data) {
                        var text = $('<div>' + data + '</div>').text().trim();
                        return text; // Keep text simple
                    }
                }
            ]
        });

        // Update row numbers
        dt.on('draw.dt', function () {
            var info = dt.page.info();
            dt.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                cell.innerHTML = info.start + i + 1;
            });
        });

        // Function to sanitize strings for comparison
        function sanitizeText(str) {
            return str.trim().replace(/\s+/g, '_').replace(/[^\w\-]/g, '').toLowerCase();
        }

        // Jump to hash if exists
        var hash = window.location.hash;
        if (hash) {
            var safeHash = sanitizeText(hash.replace('#', ''));

            // Find row index by matching sanitized column 1 text
            var targetRowIndex = dt.column(1).data().toArray().findIndex(function (d) {
                return sanitizeText(d) === safeHash;
            });

            if (targetRowIndex >= 0) {
                var page = Math.floor(targetRowIndex / dt.page.len());
                dt.page(page).draw('page');

                dt.one('draw.dt', function () {
                    var rowNode = dt.row(targetRowIndex).node();
                    if (rowNode) {
                        // Scroll to row
                        $('html, body').animate({
                            scrollTop: $(rowNode).offset().top
                        }, 500);

                        // Highlight row briefly
                        $(rowNode).css('background-color', '#ffff99');
                        setTimeout(function () {
                            $(rowNode).css('background-color', '');
                        }, 2000);
                    }
                });
            }
        }

        // Initial draw
        dt.draw();
    });
    });
    </script>    

Samples
=======

.. csv-table::
    :file: Samples.csv
    :header-rows: 1
	
