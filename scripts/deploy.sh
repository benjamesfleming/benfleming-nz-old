#!/bin/bash
aws s3 sync --delete dist s3://benfleming.io
aws s3 cp \
  s3://benfleming.io/ \
  s3://benfleming.io/ \
  --exclude '*' \
  --include '*.js' \
  --no-guess-mime-type \
  --content-type 'application/javascript' \
  --metadata-directive 'REPLACE' \
  --recursive