#!/bin/bash
set -euf -o pipefail

# Check required environment varialbe exists
if [ -z "$S3_BUCKET_DEV" ]; then
  echo "[-] ${3_BUCKET_DEV} needed"
  exit 1
fi


# Empty target s3 bucket
aws s3 rm s3://${S3_BUCKET_DEV} --recursive

# Sync target s3 bucket
aws s3 sync build s3://${S3_BUCKET_DEV} --delete --exclude "*.map"


