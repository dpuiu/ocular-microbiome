// Custom search override for Sphinx (safe for RTD theme)
(function() {
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
})();

