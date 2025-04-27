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

