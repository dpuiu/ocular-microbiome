Pipeline
--------

Steps
^^^^^

1. `minimap2 <https://github.com/lh3/minimap2>`_

  - `GCF_009914755.1_T2T-CHM13v2.0 <https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_009914755.1/>`_
  - `GCF_000001405.40_GRCh38 <https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.40/>`_

2. `krakenuniq <https://github.com/fbreitwieser/krakenuniq>`_

  - `krakendb-2020-08-16-all_pluseupath <https://benlangmead.github.io/aws-indexes/k2>`_

3. `bracken <https://github.com/jenniferlu717/Bracken/>`_

Diagram
^^^^^^^

.. mermaid::

   graph TD
   
       A[All reads] --> AA["."]
   
       subgraph Human_Read_Removal [Human read removal]
           AA -->|minimap2 T2T,GRCh38| B[Unaligned non-human reads]               
       end
       
       B --> BB["."]
   
       subgraph Pathogen_classification [Pathogen_classification]
           BB -->|krakenuniq & bracken| C[Classified reads]           
       end 
   
       style AA width:1px,height:1px
       style BB width:1px,height:1px
       style A fill:#f9f,stroke:#333,stroke-width:2px
       style B fill:#bbf,stroke:#333,stroke-width:2px
       style C fill:#bfb,stroke:#333,stroke-width:2px

