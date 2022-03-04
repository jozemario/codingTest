project = "codingtest"

app "codingtest" {
    labels = {
        "service" = "codingtest"
        "env" = "production"
    }

    build {
        use "docker" {
            buildkit    = false
            disable_entrypoint = true
            context      = "./"
            dockerfile   = "./docker/prod/Dockerfile"
        }
        registry {
            use "docker" {
                image        = "docker.mghcloud.com/codingtest"
                tag          = "1.0"
                local        = false
                encoded_auth = filebase64("${path.app}/deploy/dockerAuth.json")
            }
        }
    }

    deploy {
        use "exec" {
          dir = "${path.app}/deploy"
          command = ["terraform", "apply", "--auto-approve"]
        }
      }
}