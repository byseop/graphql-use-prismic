resource "aws_iam_user" "homepage_deploy" {
  name = "toy-homepage-prismic"
  path = "/toy/"
  tags = merge(
    local.common_tags,
    {
      "Name"        = "toy-homepage-prismic",
      "Component" = "common"
    },
  )
}

resource "aws_iam_user_policy_attachment" "homepage_deploy" {
  user       = aws_iam_user.homepage_deploy.name
  policy_arn = aws_iam_policy.homepage_deploy.arn
}

