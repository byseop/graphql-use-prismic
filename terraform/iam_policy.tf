resource "aws_iam_policy" "homepage_deploy" {
  name   = "toy-homepage-prismic"
  policy = data.aws_iam_policy_document.homepage_deploy.json
}

data "aws_iam_policy_document" "homepage_deploy" {
  # homepage.dev.omnious.com READ/WRITE Access
  statement {
    effect = "Allow"
    actions = [
      "s3:ListBucket",
    ]
    resources = [
      "${aws_s3_bucket.bucket_prod.arn}",
      "${aws_s3_bucket.bucket_dev.arn}",
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "s3:ReplicateObject",
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucketMultipartUploads",
      "s3:DeleteBucketWebsite",
      "s3:PutBucketWebsite",
      "s3:AbortMultipartUpload",
      "s3:DeleteObject",
      "s3:GetBucketLocation",
      "s3:GetBucketPolicy",
      "s3:ReplicateDelete",
      "s3:ListMultipartUploadParts",
    ]
    resources = [
      "${aws_s3_bucket.bucket_dev.arn}/*",
      "${aws_s3_bucket.bucket_prod.arn}/*",
    ]
  }

}
