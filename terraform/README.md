# toy 환경을 위한 AWS 인프라 구성

구성 test 완료 후 `terraform destroy` 로 AWS 환경 깨끗히 정리

### 구성 내용

* IAM User, Policy: `toy-homepage-prismic` Jenkins 배포 스크립트에서 사용
* S3 Bucket with static hosting: 
  * `toy-homepage-prismic-dev`  --> `http://toy-homepage-prismic.dev.omnious.co.kr`
  * `toy-homepage-prismic-prod` --> `http://toy-homepage-prismic.prod.omnious.co.kr`

* Route53 DNS: 
  * toy-homepage-prismic.dev.omnious.co.kr
  * toy-homepage-prismic.prod.omnious.co.kr
