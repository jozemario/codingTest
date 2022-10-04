terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}
provider "kubernetes" {
  config_path = "./config"
  config_context = "${var.target_context}"
}

resource "kubernetes_namespace" "codingtestk8s" {
  metadata {
    name = "${var.k8_namespace}"
  }
}
resource "kubernetes_deployment" "codingtestk8s" {
  metadata {
    name      = "${var.k8_namespace}"
    namespace = "${var.k8_namespace}"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "${var.k8_namespace}"
      }
    }
    template {
      metadata {
        labels = {
          app = "${var.k8_namespace}"
        }
      }
      spec {
        image_pull_secrets {
          name = "regcred"
        }
        container {
          image = "${var.registry_server}/${var.k8_namespace}:1.0"
          name  = "${var.k8_namespace}-container"
          image_pull_policy = "Always"
          env {
            name  = "NODE_ENV"
            value = "production"
          }
          env {
            name  = "NEXT_URL"
            value = "${var.full_prod_url}"
          }
          env {
            name  = "NEXTAUTH_URL"
            value = "${var.full_prod_url}"
          }
          env {
            name  = "SOCKETIO_URL"
            value = "${var.full_prod_url}"
          }

          port {
            container_port = 3000
          }
          volume_mount {
            mount_path = "/app/server/uploads"
            name = "${var.k8_namespace}-pvc"
            sub_path = "server_uploads"
          }
          volume_mount {
            mount_path = "/app/client/src/assets/audios"
            name = "${var.k8_namespace}-pvc"
            sub_path = "client_src_uploads"
          }
          volume_mount {
            mount_path = "/app/client/dist/assets/audios"
            name = "${var.k8_namespace}-pvc"
            sub_path = "client_dist_uploads"
          }
        }
        volume {
          name = "${var.k8_namespace}-pvc"
          persistent_volume_claim {
            claim_name = "${var.k8_namespace}-pvc"
          }
        }
      }
    }
  }
}
resource "kubernetes_service" "codingtestk8s" {
  metadata {
    name      = "${var.k8_namespace}"
    namespace = "${var.k8_namespace}"
  }
  spec {
    selector = {
      app = "${var.k8_namespace}"
    }
    type = "NodePort"
    port {
      node_port   = 30101
      port        = 3000
      target_port = 3000
    }
  }
}

resource "kubernetes_secret" "codingtestk8s" {
  metadata {
    name = "regcred"
    namespace = "${var.k8_namespace}"
  }

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "${var.registry_server}" = {
          auth = "${base64encode("${var.registry_username}:${var.registry_password}")}"
        }
      }
    })
  }

  type = "kubernetes.io/dockerconfigjson"
}

resource "kubernetes_persistent_volume_claim" "codingtestk8s" {
  metadata {
    name      = "${var.k8_namespace}-pvc"
    labels = {
      app = "${var.k8_namespace}"
    }
    namespace = "${var.k8_namespace}"
  }
  spec {
    access_modes = ["ReadWriteMany"]
    storage_class_name = ""
    resources {
      requests = {
        storage = "5Gi"
      }
    }
    volume_name = "${var.k8_namespace}-pv"
  }
}

resource "kubernetes_persistent_volume" "codingtestk8s" {
  metadata {
    name = "${var.k8_namespace}-pv"
    labels = {
      app = "${var.k8_namespace}"
    }
  }
  spec {
    capacity = {
      storage = "5Gi"
    }
    access_modes = ["ReadWriteMany"]
    persistent_volume_reclaim_policy = "Delete"
    persistent_volume_source {
      nfs {
        path   = "${var.nfs_path}"
        server = "${var.nfs_server}"
        read_only = "false"
      }
    }
    claim_ref {
      namespace = "${var.k8_namespace}"
      name = "${var.k8_namespace}-pvc"
    }
  }
}

# resource "kubernetes_ingress" "codingtestk8s" {
#   metadata {
#     labels = {
#       app = "codingtest"
#     }
#     name = "codingtest-ingress"
#     namespace = kubernetes_namespace.codingtestk8s.metadata.0.name

#     annotations = {
#       "kubernetes.io/ingress.class": "nginx-ingress"
#       "cert-manager.io/cluster-issuer": "letsencrypt-prod"
#       "nginx.org/websocket-services": "codingtest"
#       #"kubernetes.io/ingress.class" = "nginx"
#       # "nginx.ingress.kubernetes.io/configuration-snippet" = <<-EOT
#       #   modsecurity_rules '
#       #    SecRuleEngine On
#       #    SecRequestBodyAccess On
#       #    SecAuditEngine RelevantOnly
#       #    SecAuditLogParts ABCIJDEFHZ
#       #    SecAuditLog /var/log/modsec_audit.log
#       #    SecRuleRemoveById 932140
#       #   ';
#       # EOT
#       # "nginx.ingress.kubernetes.io/ssl-passthrough" = "true"
      
#     }
#   }

#   spec {
#     tls {
#       hosts = ["codingtest.mghcloud.com"]
#       secret_name = "codingtest-tls"
#     }
#     rule {
#       host = "codingtest.mghcloud.com"
#       http {
#         path {
#           path = "/"
#           backend {
#             service_name = "codingtest"
#             service_port = 3000
#           }
#         }
#         path {  
#           path = "/socket.io/.*"
#           backend {
#             service_name = "codingtest"
#             service_port = 3000
#           }
#         }
#       }
#     }
#   }
  
# }

# resource "kubernetes_service" "codingtestlbk8s" {
#   metadata {
#     name      = "ingress-nginx-controller-codingtest"
#     namespace = kubernetes_namespace.codingtestk8s.metadata.0.name
#     annotations = {
#       "service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol" = "true"
#       "service.beta.kubernetes.io/do-loadbalancer-hostname" = "codingtest.mghcloud.com"
#     }
#     labels = {
#       "helm.sh/chart"= "ingress-nginx-3.21.0"
#       "app.kubernetes.io/name" = "ingress-nginx"
#       "app.kubernetes.io/instance" = "ingress-nginx"
#       "app.kubernetes.io/version" = "0.43.0"
#       "app.kubernetes.io/managed-by" = "Helm"
#       "app.kubernetes.io/component" = "controller"
#     }
#   }
#   spec {
#     selector = {
#       "app.kubernetes.io/name": "ingress-nginx"
#       "app.kubernetes.io/instance": "ingress-nginx"
#       "app.kubernetes.io/component": "controller"
#     }
#     type = "LoadBalancer"
#     port {
#       name        = "http"
#       port        = 80
#       protocol    = "TCP"
#       target_port = "http"
#     }
#     port {
#       name        = "https"
#       port        = 443
#       protocol    = "TCP"
#       target_port = "https"
#     }
#   }
# }   