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
    $(document).ready(function() {
        $('table.docutils.align-default').each(function() {
            var $table = $(this);

            $table.find('thead tr').prepend('<th>#</th>');
            $table.find('tbody tr').prepend('<td></td>');

            var dt = $table.DataTable({
                dom: 'tBfipr',
                paging: false,
                pageLength: -1,
                lengthMenu: [[-1],["All"]],
                buttons: [                 
                 { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)' }},
                ],
            });

            dt.on('draw.dt', function() {
                var info = dt.page.info();
                dt.column(0, { page: 'current' }).nodes().each(function(cell, i) {
                    cell.innerHTML = info.start + i + 1;
                });
            });

            dt.draw();
        });
    });
    </script>

