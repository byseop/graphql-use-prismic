pipeline {
    agent any
    environment {
        APP_NAME  = "toy-homepage-prismic"
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        S3_BUCKET_DEV        = "toy-homepage-prismic-dev"
        S3_BUCKET_PROD       = "toy-homepage-prismic-prod"
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('prepare') {
            steps {
                script {
                    def packageJSON = readJSON file: './package.json'
                    env.VERSION = packageJSON.version
                    env.BRANCH_NAME_FOR_TAG = sh(
                        returnStdout: true,
                        script: 'echo ${BRANCH_NAME}'
                    ).trim().replace("/", "-").replace("%2F", "-")
                    env.CURR_GIT_TAG = sh(
                        returnStdout: true,
                        script: 'git tag -l --points-at HEAD'
                    ).trim()
                }
                slackSend(
                    message: "start to build [${APP_NAME} v${VERSION}] \n <${BUILD_URL}|${currentBuild.fullDisplayName}> \n build_id: <${BUILD_URL}|${BUILD_ID}> \n build_tag: ${BUILD_TAG}\n job: <${JOB_URL}|${JOB_NAME}>",
                    color: 'good',
                    channel: '#dev-build'
                )
                // TODO: --frozen-lockfile 을 쓰도록 권장하지만 에러가 발생하여 우선 빼 두었습니다.
                // 추후 Test해 보면서 꼭 위 옵션을 넣기를 바랍니다
                // (해당 옵션이 없으면 배포시점에서 yarn.lock 파일이 변경됩니다.)
                // sh "yarn install --dev --frozen-lockfile"
                sh "yarn install --dev"
            }
        }
        stage('lint and test') {
            steps {
                // TODO: Lint와 test 작업 완료 후 해당 부분 주석 해제해주세요
                sh "echo 'TODO'"
                // sh "yarn lint"
                // sh "yarn test"
            }
        }
        stage('git tag') {
            when {
            // TIP: 상세 내용은 여기를 참조하세요 https://jenkins.io/doc/book/pipeline/syntax/#when
                anyOf {
                    branch 'master'
                    environment name: 'PIPELINE_DEBUG_TAG', value: 'yes'
                }
            }
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'GIT_CREDENTIAL',
                        usernameVariable: 'SSH_USER',
                        keyFileVariable: 'SSH_KEY'
                    )
                ]) {
                    sh "./jenkins/push_tag.sh"
                }
            }
        }
        stage('deploy to develop') {
            when {
                anyOf {
                    branch 'develop'
                    environment name: 'PIPELINE_DEBUG_DEPLOY_DEVELOP', value: 'yes'
                }
            }
            steps {
                sh "REACT_APP_ENV=development NODE_ENV=production yarn build"
                sh "./jenkins/deploy_dev.sh"
            }
        }
        stage('deploy to production') {
            when {
                anyOf {
                    expression {
                        env.BRANCH_NAME == 'master' && env.CURR_GIT_TAG != null
                    }
                    expression {
                        env.CURR_GIT_TAG != null && env.PIPELINE_DEBUG_DEPLOY_PROD == 'yes'
                    }
                }
            }
            stages {
                stage('slack notification about survey') {
                    steps {
                        // TODO: Slack Message 정의해주세요!
                        slackSend(
                            message: "[${APP_NAME} v${VERSION}] \n Please answer survey! \n <${BUILD_URL}|${currentBuild.fullDisplayName}> \n build_id: <${BUILD_URL}|${BUILD_ID}> \n job: <${JOB_URL}|${JOB_NAME}>",
                            color: 'good',
                            channel: '#-homepage'
                        )
                    }
                }
                stage('survey and deploy') {
                    input {
                        message "Continue to deploy into production environment?"
                        ok "Yes, Do it!"
                    }
                    steps {
                        echo "deploy '${CURR_GIT_TAG}' into production"
                        sh "REACT_APP_ENV=production NODE_ENV=production yarn build"
                        sh "./jenkins/deploy_prod.sh"
                    }
                }
            }

        }
    }
    post {
        success {
            slackSend(channel: '#dev-build', color: 'good', message: "The pipeline <${BUILD_URL}|${currentBuild.fullDisplayName}> completed successfully.")
        }
        aborted{
            slackSend(channel: '#dev-build', color: 'warning', message: "The pipeline <${BUILD_URL}|${currentBuild.fullDisplayName}> aborted.")
        }
        failure{
            slackSend(channel: '#dev-build', color: 'danger', message: "The pipeline <${BUILD_URL}|${currentBuild.fullDisplayName}> failed.")
        }

    }
}
