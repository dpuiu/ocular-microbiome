# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Ocular Microbial Project'
copyright = '2025, JHU CCB'
author = 'Daniela Puiu'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = []

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

#html_theme = 'alabaster'		# default, minimalistic
html_theme = "sphinx_rtd_theme" # nice but truncated the tables

html_static_path = ['_static']
html_css_files = ['custom.css']
###################################################

# added by dpuiu
extensions = [ 'recommonmark' ]

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

from recommonmark.parser import CommonMarkParser
source_parsers = {
    '.md': CommonMarkParser,
}

