Samples: Conjunctiva,DNA-Seq
============================

.. csv-table::
    :file: Samples.csv
    :header-rows: 1
    :name: vumc-samples

Individuals
===========

.. csv-table::
    :file: Individuals.csv
    :header-rows: 1
    :name: vumc-individuals


.. include:: header.rst

.. raw:: html

    <script>
    $(function () {
         //initSampleTable('table.docutils.align-default', 1, 3, [3], [14], 'Consortium_data/VUMC');
         initSampleTable('#vumc-samples', 1, 3, [3], [10,11,12,13,14], 'Consortium_data/VUMC');
         initSampleTable('#vumc-individuals', 1);

    });
    </script>

