# ocular-microbiome Project Web Site 
  
## URL 

    https://www.ocular-microbiome.org/

## Build (using Sphinx)

    pip install --user --break-system-packages  sphinx recommonmark sphinx_rtd_theme
 
    git clone https://github.com/dpuiu/ocular-microbiome.git
 
    cd ocular-microbiome
    make html

    # the output files will be available under _build/html/

## Config Files

    docs/conf.py
    docs/_static/custom.css

## reStructured text files

    index.rst         # Home page
    header.rst
    footer.rst
    ...

## Image files

    images/*

## Links

    https://www.sphinx-doc.org
    https://sphinx-rtd-theme.readthedocs.io/en/stable/index.html
