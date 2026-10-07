Samples: All
============

.. csv-table::
    :file: Samples.csv
    :header-rows: 1
    :name: jhu-samples

Individuals
===========

.. csv-table::
    :file: Individuals.csv
    :header-rows: 1
    :name: jhu-individuals



.. include:: header.rst

.. raw:: html

    <script>
    $(function () {
        //initSampleTable('table.docutils.align-default', 1, 3, [3, 4, 5], [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 'Consortium_data/JHU','.unmapped.fasta.gz');
        initSampleTable('#jhu-samples', 1, 3, [3, 4, 5], [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 'Consortium_data/JHU','.unmapped.fasta.gz')
        initSampleTable('#jhu-individuals', 1);
    });
    </script>    
