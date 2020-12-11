#!/bin/bash
set -euf -o pipefail

# Check required environment varialbe exists
if [ -z "$S3_BUCKET_PROD" ]; then
  echo "[-] S3_BUCKET_PROD needed"
  exit 1
fi

# Empty target s3 bucket
aws s3 rm s3://${S3_BUCKET_PROD} --recursive

# Sync target s3 bucket
aws s3 sync public s3://${S3_BUCKET_PROD} --delete --exclude "*.map" --exclude "google*" --exclude "naver*"
