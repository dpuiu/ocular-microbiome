.. raw:: html

    <meta name="google-site-verification" content="e2LnwrGlv397RPlrT8ckb-yVwcPyZaGyADcmCFv63y4" />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <!--script>$(document).ready(function () { $('.docutils').DataTable({pageLength: 5, dom: '<"middle"t><"bottom"lfip>', lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Show All"]]}); }); </script-->
    <!--script>$(document).ready(function () { $('table.docutils.align-default').each(function () { const $t = $(this); $t.find('thead tr').prepend('<th>#</th>'); $t.find('tbody tr').each(function () { $(this).prepend('<td></td>'); }); const dt = $t.DataTable({ pageLength: 5, dom: '<"top"f>rt<"bottom"lp><"clear">', order: [[1, 'asc']], columnDefs: [{ targets: 0, searchable: false, orderable: false, className: 'dt-center' }] }); dt.on('draw.dt', function () { const info = dt.page.info(); dt.column(0, { page: 'current' }).nodes().each(function (cell, i) { cell.innerHTML = info.start + i + 1; }); }); dt.draw(); }); });</script-->
    <script>$(document).ready(function(){ $('table.docutils.align-default').each(function(){const $t=$(this); $t.find('thead tr').prepend('<th>#</th>'); $t.find('tbody tr').each(function(){ $(this).prepend('<td></td>'); }); const dt=$t.DataTable({pageLength:5,lengthMenu:[[5,10,25,50,-1],[5,10,25,50,"Show All"]],dom:'<"middle"t><"bottom"lfip>',order:[[1,'asc']],columnDefs:[{targets:0,searchable:false,orderable:false,className:'dt-center'}]}); dt.on('draw.dt',function(){const info=dt.page.info(); dt.column(0,{page:'current'}).nodes().each(function(cell,i){cell.innerHTML=info.start+i+1;});}); dt.draw(); }); });</script>

