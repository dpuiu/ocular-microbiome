// Custom search override for Sphinx (safe for RTD theme)

(function() {
    ////////////////////////////////////////////////////////
    function overrideSearch() {
        if (!window.Search || !Search.prototype) return;

        // Wait until index is loaded
        const origLoadIndex = Search.prototype.loadIndex;
        Search.prototype.loadIndex = function(url) {
            const self = this;
            const origCallback = this._loadIndexCallback;

            // Wrap the callback after index is loaded
            this._loadIndexCallback = function() {
                // Build mapping of docname -> page title
                const titleMap = {};
                if (Search.index && Search.index.docnames && Search.index.titles) {
                    for (let i = 0; i < Search.index.docnames.length; i++) {
                        titleMap[Search.index.docnames[i]] = Search.index.titles[i];
                    }
                }

                // Override displayNextItem
                const origDisplay = self.displayNextItem;
                self.displayNextItem = function() {
                    const item = this.results.pop();
                    if (!item) return;

                    const listItem = document.createElement("li");
                    const linkEl = document.createElement("a");
                    linkEl.href =
                        item[0] +
                        DOCUMENTATION_OPTIONS.FILE_SUFFIX +
                        "?highlight=" +
                        encodeURIComponent(this.terms) +
                        "#" +
                        item[1];

                    // Show page title as breadcrumb + section title
                    const ancestors = titleMap[item[0]] ? [titleMap[item[0]]] : [];
                    const fullTitle = ancestors.length > 0
                        ? ancestors.join(" › ") + " › " + item[2]
                        : item[2];

                    linkEl.textContent = fullTitle;
                    listItem.appendChild(linkEl);

                    if (item[3]) {
                        const context = document.createElement("div");
                        context.className = "context";
                        context.innerHTML = "... " + item[3] + " ...";
                        listItem.appendChild(context);
                    }

                    this.resultsList.appendChild(listItem);
                    return true;
                };

                // Call original callback to finish
                if (origCallback) origCallback.call(self);
            };

            // Call original loadIndex
            origLoadIndex.call(this, url);
        };
    }

    if (document.readyState === "complete") {
        overrideSearch();
    } else {
        window.addEventListener("load", overrideSearch);
    }

    ////////////////////////////////////////////////////////
    function initSampleTable(selector, idTarget, downloadTarget, numericTargets, hiddenTargets, dataset, extension) {
    // Safe defaults (NO ES6 default parameters)
    selector = selector || 'table.docutils.align-default';
    numericTargets = numericTargets || [];
    hiddenTargets = hiddenTargets || [];
    dataset = dataset || '';
    extension = extension || '.unmapped.fastq.gz';

    const baseUrl =
        'https://data.idies.jhu.edu/OcularMicrobiome/' + dataset;

    $(selector).each(function () {
        const $table = $(this);

        // Add row number column if not present
        if ($table.find('thead th').first().text() !== '#') {
            $table.find('thead tr').prepend('<th>#</th>');
            $table.find('tbody tr').prepend('<td></td>');
        }

        const dt = $table.DataTable({
            dom: 'tBfipr',
            pageLength: 10,
            deferRender: true,
            lengthMenu: [[10, 50, -1], [10, 50, "All"]],

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

            columnDefs: initSampleColumns(idTarget, downloadTarget, numericTargets, hiddenTargets, baseUrl, extension)
        });

        // Row numbering
        dt.on('draw.dt', function () {
            const info = dt.page.info();
            dt.column(0, { page: 'current' }).nodes().each(function (cell, i) {
                cell.innerHTML = info.start + i + 1;
            });
        });

        dt.draw();
    });
    }

    window.initSampleTable = initSampleTable;

    ////////////////////////////////////////////////////////
    function initSampleColumns(idTarget, downloadTarget, numericTargets, hiddenTargets, baseUrl, extension) {
    const defs = [];

    // ID column (optional)
    if (idTarget !== undefined && idTarget !== null) {
        defs.push({
            targets: idTarget,
            render: function (data) {
                const text = $('<div>' + data + '</div>').text().trim();
                return '<p id="' + text + '">' + text + '</p>';
            }
        });
    }

    // Download column (optional)
    if (downloadTarget !== undefined && downloadTarget !== null) {
        defs.push({
            targets: downloadTarget,
            render: function (data, type, row) {
                const text = $('<div>' + data + '</div>').text().trim();

                const sourceIndex = downloadTarget - 1;
                const ntext = $('<div>' + row[sourceIndex] + '</div>').text().trim();

                if ($.isNumeric(text)) {
                    return '<a href="' + baseUrl + '/' + ntext + extension + '"' +
                           'download>' +
                           Number(text).toLocaleString() +
                           '</a>';
                }
                return data;
            }
        });
    }

    // Numeric columns (optional)
    if (numericTargets && numericTargets.length > 0) {
        defs.push({
            targets: numericTargets,
            render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();

                if ($.isNumeric(text)) {
                    return Number(text).toLocaleString();
                }
                return data;
            }
        }); 
    }

    // Hidden columns (optional)
    if (hiddenTargets.length > 0) {
        defs.push({
            targets: hiddenTargets,
            visible: false
        });
    }

    return defs;
    }

    window.initSampleColumns = initSampleColumns;

    /*
    function initPublicationTable(selector) {

     selector = selector || 'table.docutils.align-default';

      $(selector).each(function () {
        var $table = $(this);
    
        // Add row number column if it doesn't already exist
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
          $table.find('thead tr').prepend('<th>#</th>');
          $table.find('tbody tr').prepend('<td></td>');
        }
    
        var dt = $table.DataTable({
          dom: 'tBfipr',
          pageLength: 10,
          lengthMenu: [[10, 50, -1], [10, 50, "All"]],
    
          buttons: [
          'pageLength',
           { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)',  format: { body: function (data) { return $('<div>' + data + '</div>').text().replace(/,/g, '');}}}},
           { extend: 'colvis', text: 'Columns' }
          ],

          columnDefs: [
          {
                    targets: 1,
                    render: function (data, type, row, meta) {
                        var text = $('<div>' + data + '</div>').text().trim();

                        return '<a href="https://www.ncbi.nlm.nih.gov/bioproject/' +
                        text +
                        '" target="_blank" rel="noopener" title="NCBI BioProject">' +
                        text +
                        '</a>';
                    }
          },
            {
              targets: [3],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
    
                if ($.isNumeric(text)) {
                  return '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' +
                    text +
                    '" target="_blank" rel="noopener" title="NCBI Taxonomy">' +
                    text +
                    '</a>';
                }
                return data;
              }
            },
            {
              // Last column: format numeric values with thousands separator
              targets: [5,6,7],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
                if ($.isNumeric(text)) {
                   return Number(text).toLocaleString(); 
                }
                return data;
              }
            },
            {
               targets: [4,5,6],
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
    }

    window.initPublicationTable = initPublicationTable;
    */

    ////////////////////////////////////////////////////////

   function initPublicationTable(selector) {

     selector = selector || 'table.docutils.align-default';

      $(selector).each(function () {
        var $table = $(this);

        // Add row number column if it doesn't already exist
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
          $table.find('thead tr').prepend('<th>#</th>');
          $table.find('tbody tr').prepend('<td></td>');
        }

	var dt = $table.DataTable({
          dom: 'tBfipr',
          pageLength: 10,
          lengthMenu: [[10, 50, -1], [10, 50, "All"]],

          buttons: [
          'pageLength',
           { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)',  format: { body: function (data) { return $('<div>' + data + '</div>').text().replace(/,/g, '');}}}},
           { extend: 'colvis', text: 'Columns' }
          ],

          columnDefs: [
            {
              targets: [1],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
                if ($.isNumeric(text)) {
                   return Number(text).toLocaleString();
                }
                return data;
              }
            },
            {
             	targets: [3],
                render: function (data, type, row, meta) {
                    var text = $('<div>' + data + '</div>').text().trim();  // text to show
                    var ndata = row[4];                                     // URL
                    var ntext = $('<div>' + ndata + '</div>').text().trim();
                    return '<a href="' + ntext + '">' + text + '</a>';      // return inside function
                }
            },
            {
               targets: [4],
               visible: false
            }
          ],
          order: [[1, 'desc']]

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
    }

    window.initPublicationTable = initPublicationTable;

    /////////////
    function initResultTable (selector) {

      selector = selector || 'table.docutils.align-default';

      $(selector).each(function () {

        var $table = $(this);
    
        // Add row number column if it doesn't already exist
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
          $table.find('thead tr').prepend('<th>#</th>');
          $table.find('tbody tr').prepend('<td></td>');
        }
    
        var dt = $table.DataTable({
          dom: 'tBfipr',
          pageLength: 10,
          lengthMenu: [[10, 50, -1], [10, 50, "All"]],
    
          buttons: [
          'pageLength',
           { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)',  format: { body: function (data) { return $('<div>' + data + '</div>').text().replace(/,/g, '');}}}},
           { extend: 'colvis', text: 'Columns' }
          ],

          columnDefs: [
          {
                    targets: 1,
                    render: function (data, type, row, meta) {
                        var text = $('<div>' + data + '</div>').text().trim();

                        return '<a href="https://www.ncbi.nlm.nih.gov/bioproject/' +
                        text +
                        '" target="_blank" rel="noopener" title="NCBI BioProject">' +
                        text +
                        '</a>';
                    }
          },
            {
              targets: [3],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
    
                if ($.isNumeric(text)) {
                  return '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' +
                    text +
                    '" target="_blank" rel="noopener" title="NCBI Taxonomy">' +
                    text +
                    '</a>';
                }
                return data;
              }
            },
            {
              // Last column: format numeric values with thousands separator
              targets: [5,6,7],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
                if ($.isNumeric(text)) {
                   return Number(text).toLocaleString(); 
                }
                return data;
              }
            },
            {
               targets: [4,5,6],
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
    }

    window.initResultTable = initResultTable;

    ////////////////////////////////////////////////////////
    function initMergedResultTable(selector) {

      selector = selector || 'table.docutils.align-default';

      $(selector).each(function () {

        var $table = $(this);

        // Add row number column if it doesn't already exist
        if ($table.find('thead th').length === $table.find('thead tr').first().children().length) {
          $table.find('thead tr').prepend('<th>#</th>');
          $table.find('tbody tr').prepend('<td></td>');
        }

	var dt = $table.DataTable({
          dom: 'tBfipr',
          pageLength: 10,
          lengthMenu: [[10, 50, -1], [10, 50, "All"]],

          buttons: [
          'pageLength',
           { extend: 'csv', text: 'Save', exportOptions: { columns: ':not(:first-child)',  format: { body: function (data) { return $('<div>' + data + '</div>').text().replace(/,/g, '');}}}},
           { extend: 'colvis', text: 'Columns' }
          ],

          columnDefs: [
            {
              targets: [2,5],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();

                if ($.isNumeric(text)) {
                  return '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=' +
                    text +
                    '" target="_blank" rel="noopener" title="NCBI Taxonomy">' +
                    text +
                    '</a>';
                }
                return data;
              }
            },
            {
              targets: [7,8,9],
              render: function (data, type, row, meta) {
                var text = $('<div>' + data + '</div>').text().trim();
                if ($.isNumeric(text)) {
                   return Number(text).toLocaleString();
                }
                return data;
              }
            },
            {
               targets: [3,6,7,8],
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
    }

    window.initMergedResultTable = initMergedResultTable;

    ////////////////////////////////////////////////////////
    function initProjectTable (selector) {

      selector = selector || 'table.docutils.align-default';

      $(selector).each(function () {

            var $table = $(this);

            $table.find('thead tr').prepend('<th>#</th>');
            $table.find('tbody tr').prepend('<td></td>');

            var dt = $table.DataTable({
                dom: 'tBfipr',
                pageLength: 10,
                lengthMenu: [[10, 50, -1],[10, 50, "All"]],
                buttons: [
                    'pageLength',
                    { extend: 'csv', exportOptions: { columns: ':not(:first-child)' } },
                    'colvis'
                ],
                columnDefs: [
                {
                    targets: 1,
                    render: function (data, type, row, meta) {
                        var text = $('<div>' + data + '</div>').text().trim();

                        return '<a href="https://www.ncbi.nlm.nih.gov/bioproject/' +
                        text +
                        '" target="_blank" rel="noopener" title="NCBI BioProject">' +
                        text +
                        '</a>';
                    }
                },
                {
                    targets: [-3,-2,-1],
                    render: function(data, type, row, meta) {
                        var text = $('<div>' + data + '</div>').text().trim();

                        if ($.isNumeric(text)) {
                          return Number(text).toLocaleString();
                        }

                        return data;
                    }
                }],
                order: [[1, 'asc']]

            });

            dt.on('draw.dt', function() {
                var info = dt.page.info();
                dt.column(0, { page: 'current' }).nodes().each(function(cell, i) {
                    cell.innerHTML = info.start + i + 1;
                });
            });

            dt.draw();
        });
    }

    window.initProjectTable = initProjectTable;

})();

