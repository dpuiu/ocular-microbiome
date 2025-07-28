# Configuration file for the Sphinx documentation builder.

# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

import os
import sys
sys.path.insert(0, os.path.abspath('.'))

project = 'Ocular Microbial Project'
copyright = '2025 Ocular Microbiome Consortium'
author = 'Daniela Puiu'

html_theme = "sphinx_rtd_theme" 
html_theme_options = { "navigation_depth": 2 }
html_static_path = ['_static']
html_css_files = ['custom.css']
html_js_files = ['custom.js']
html_search_options = { 'separate_word_search': True }
html_search_language = 'en'
html_theme_options = { "use_table_sorting": False }
html_extra_path = ['Consortium_results']

master_doc = 'index'
templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', "**/OLD*","**/*.csv"]
extensions = ['sphinxcontrib.mermaid','sphinx_design']  # 'recommonmark', 'myst_parser; sphinx_design
source_suffix = { '.rst': 'restructuredtext' } #    '.md': 'markdown',

#from recommonmark.parser import CommonMarkParser
#source_parsers = {    '.md': CommonMarkParser }

