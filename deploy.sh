#!/usr/bin/env sh

go run build.go && \
	aws s3 cp --exclude .git . s3://gabipurcarudotcom/ --recursive && \
	aws cloudfront create-invalidation --distribution-id E11ESMQ1M27SPF --path '/*'
