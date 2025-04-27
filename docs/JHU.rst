.. include:: header.rst

Johns Hopkins University
========================

Additional Members
------------------
- `Jen Lu <mailto:jlu26@jhmi.edu>`_
- `Daniela Puiu <mailto:dpuiu1@jhu.edu>`_
- `Nakul S Shekhawat <mailto:nshekha1@jhmi.edu>`_
- `Trish Simner <mailto:psimner1@jhmi.edu>`_
- `Fareeha Zulfiqar <mailto:fzulfiq1@jhmi.edu>`_

Pipeline
--------

.. mermaid::

   graph TD
       
       A[All reads] --> AA["."]

       subgraph Human_Read_Removal [Human read removal]
           AA -->|minimap2 T2T| B[Unaligned reads]    
           B -->|minimap2 GRCh38| C[Unaligned reads]
       end
    
       C[All reads] --> CC["."]

       subgraph Pathogen_classification [Pathogen_classification]
           CC -->|krakenuniq| D[Classified reads]
           D -->|bracken| E[Classified reads]
       end 

       style AA width:1px,height:1px
       style CC width:1px,height:1px
       style A fill:#f9f,stroke:#333,stroke-width:2px
       style B fill:#bbf,stroke:#333,stroke-width:2px
       style C fill:#bbf,stroke:#333,stroke-width:2px
       style D fill:#bfb,stroke:#333,stroke-width:2px
       style E fill:#bfb,stroke:#333,stroke-width:2px

Steps:

1. `minimap2 <https://github.com/lh3/minimap2>`_

  - `GCF_009914755.1_T2T-CHM13v2.0 <https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_009914755.1/>`_
  - `GCF_000001405.40_GRCh38 <https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.40/>`_

2. `krakenuniq <https://github.com/fbreitwieser/krakenuniq>`_

  - `krakendb-2020-08-16-all_pluseupath <https://benlangmead.github.io/aws-indexes/k2>`_

3. `bracken <https://github.com/jenniferlu717/Bracken/>`_

Data
----

.. include:: JHU/Summary.rst

.. include:: separator

.. include:: JHU/Data.rst

Results
-------

.. include:: JHU/Results.rst

.. include:: footer.rst

