
resource "aws_route53_record" "prod" {
  zone_id = "ZHR37H0674PCG"
  name    = "toy-homepage-prismic.prod.omnious.co.kr"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.bucket_prod.website_domain
    zone_id                = aws_s3_bucket.bucket_prod.hosted_zone_id
    evaluate_target_health = false
  }
}



resource "aws_route53_record" "dev" {
  zone_id = "ZHR37H0674PCG"
  name    = "toy-homepage-prismic.dev.omnious.co.kr"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.bucket_dev.website_domain
    zone_id                = aws_s3_bucket.bucket_dev.hosted_zone_id
    evaluate_target_health = false
  }
}
