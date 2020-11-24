resource "aws_s3_bucket" "bucket_dev" {
  bucket = "toy-homepage-prismic-dev"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = merge(
    local.common_tags,
    {
      "Name"        = "toy-homepage-prismic-dev",
      "Component" = "common"
    },
  )
}

resource "aws_s3_bucket_policy" "policy_dev" {
  bucket = aws_s3_bucket.bucket_dev.id

  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
            "s3:GetObject",
            "s3:ListBucket"
        ],
        "Resource": [
            "${aws_s3_bucket.bucket_dev.arn}",
            "${aws_s3_bucket.bucket_dev.arn}/*",
        ]
    }
  ]
}
POLICY
}

resource "aws_s3_bucket" "bucket_prod" {
  bucket = "toy-homepage-prismic-prod"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = merge(
    local.common_tags,
    {
      "Name"        = "toy-homepage-prismic-prod",
      "Component" = "common"
    },
  )
}

resource "aws_s3_bucket_policy" "policy_prod" {
  bucket = aws_s3_bucket.bucket_prod.id

  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
            "s3:GetObject",
            "s3:ListBucket"
        ],
        "Resource": [
            "${aws_s3_bucket.bucket_prod.arn}",
            "${aws_s3_bucket.bucket_prod.arn}/*",
        ]
    }
  ]
}
POLICY
}
