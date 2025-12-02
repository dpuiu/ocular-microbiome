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
#sys.path.insert(0, os.path.abspath('./_extensions'))

#############################################################

#############################################################

project = 'Ocular Microbial Consortium'
copyright = '2025 Ocular Microbiome Consortium'
author = 'Daniela Puiu'

html_theme = "sphinx_rtd_theme"
html_static_path = ['_static']
html_css_files = ['custom.css']
html_js_files = ['custom.js']
html_search_options = { 'separate_word_search': True }
html_search_language = 'en'
#html_theme_options = { "navigation_depth": 2 }
#html_theme_options = { "use_table_sorting": False } $ commented on 20250911
html_theme_options = {    "collapse_navigation": False,  "sticky_navigation": True, "navigation_depth": 2, "includehidden": True }
#html_extra_path = [] # 'Public_Results']
html_meta = {    "google-site-verification": "e2LnwrGlv397RPlrT8ckb-yVwcPyZaGyADcmCFv63y4" }

master_doc = 'index'
templates_path = [] # '_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', "OLD*/*" , "**/OLD*","**/*.csv*"]
extensions = ['sphinxcontrib.mermaid','sphinx_design','myst_parser'] #'sphinxcontrib.lunrsearch']  # 'recommonmark', 'myst_parser; sphinx_design. 'search_extension'
source_suffix = { '.rst': 'restructuredtext' , '.md': 'markdown' }

#from recommonmark.parser import CommonMarkParser
#source_parsers = {    '.md': CommonMarkParser }

