# Contributing to the OMC Website

This repository contains the source files for the [**Ocular Microbiome Consortium (OMC)**](https://www.ocular-microbiome.org/) website

```text
https://github.com/dpuiu/ocular-microbiome
```

## Clone Repo

```bash
git clone https://github.com/dpuiu/ocular-microbiome.git
```

## Install Dependencies

```bash
cd ocular-microbiome
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Build

```bash
make clean
make html
```

## Start Web Server

```bash
lsof -i :8002                  # check port is free
python -m http.server 8002 \
    --bind 127.0.0.1 \
    -d _build/html
```
