#!/bin/bash
set -e

BUCKET="hamuel-me"
SOURCE="content"
DISTRIBUTION_ID="E3IUC88LP8VKVV"

echo "Building..."
bun run build

echo "Uploading to s3://${BUCKET}/..."
aws s3 sync "${SOURCE}" "s3://${BUCKET}/" --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "${DISTRIBUTION_ID}" --paths "/*"

echo "Done."
