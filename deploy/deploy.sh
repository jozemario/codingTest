#!/bin/bash

export ROOT_PATH=./
set -o allexport
source $ROOT_PATH.env set
set +o allexport

echo "VALIDATING REQUIRED INPUTS"
[[ -z $ROOT_PATH ]] && { echo "ROOT_PATH environment variable is required" >&2; exit 1; }
[[ -z $REGISTRY_PASSWORD ]] && { echo "REGISTRY_PASSWORD environment variable is required" >&2; exit 1; }
[[ -z $REGISTRY_USERNAME ]] && { echo "REGISTRY_USERNAME environment variable is required" >&2; exit 1; }
[[ -z $REGISTRY_HOST ]] && { echo "REGISTRY_HOST environment variable is required" >&2; exit 1; }
[[ -z $PROD_URL ]] && { echo "PROD_URL environment variable is required" >&2; exit 1; }
[[ -z $NAMESPACE ]] && { echo "NAMESPACE environment variable is required" >&2; exit 1; }
[[ -z $SERVICE_NAME ]] && { echo "SERVICE_NAME environment variable is required" >&2; exit 1; }
[[ -z $SERVICE_PORT ]] && { echo "SERVICE_PORT environment variable is required" >&2; exit 1; }
[[ -z $IS_AWS ]] && { echo "IS_AWS environment variable is required" >&2; exit 1; }
[[ -z $KEEP ]] && { echo "KEEP environment variable is required" >&2; exit 1; }

echo "CREATING AUTH FILES\n"
echo "-dockerAuth.json\n"
cat <<EOF > $ROOT_PATH/deploy/dockerAuth.json
{
  "username": "$REGISTRY_USERNAME",
  "password": "$REGISTRY_PASSWORD"
}
EOF
echo "Created.\n"

echo "CREATING AUTH FILES\n"
echo "-variables.tf\n"
cat <<EOF > $ROOT_PATH/deploy/variables.tf
variable "registry_server" {
  description = "Value of registry_server docker"
  type        = string
  default     = "$REGISTRY_HOST"
}

variable "registry_username" {
  description = "Value of registry_username docker"
  type        = string
  default     = "$REGISTRY_USERNAME"
}

variable "registry_password" {
  description = "Value of registry_password docker"
  type        = string
  default     = "$REGISTRY_PASSWORD"
}

variable "k8_namespace" {
  description = "Value of namespace k8s"
  type        = string
  default     = "$NAMESPACE"
}

variable "full_prod_url" {
  description = "Value of url with protocol"
  type        =  string
  default     = "https://$PROD_URL"
}

variable "target_context" {
  description = "Value of target_context"
  type        =  string
  default     = "$K8S_CURRENT_CONTEXT"
}

variable "nfs_path" {
  description = "Value of nfs_path"
  type        =  string
  default     = "$NFS_PATH"
}

variable "nfs_server" {
  description = "Value of nfs_server"
  type        =  string
  default     = "$NFS_SERVER"
}
EOF
echo "Created.\n"

echo "CREATING K8S FILES\n"
echo "-ingress.yaml\n"

cat <<EOF > $ROOT_PATH/deploy/ingress.yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: $NAMESPACE-ingress
  namespace: $NAMESPACE
  annotations:
    #ISSUE SSL LETS ENCRYPT
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    #cert-manager.io/cluster-issuer: "letsencrypt-staging"
    #ISSUE SSL LETS ENCRYPT
    nginx.org/websocket-services: "$SERVICE_NAME"
spec:
  tls:
  - hosts:
    - "$PROD_URL"
    secretName: $NAMESPACE-tls
  rules:
  - host: "$PROD_URL"
    http:
      paths:
      - backend:
          serviceName: $SERVICE_NAME
          servicePort: $SERVICE_PORT
      - path: /socket.io/.*
        backend:
          serviceName: $SERVICE_NAME
          servicePort: $SERVICE_PORT
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol: 'true'
    service.beta.kubernetes.io/do-loadbalancer-hostname: "$PROD_URL"
  labels:
    helm.sh/chart: ingress-nginx-3.21.0
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/version: 0.43.0
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: controller
  name: ingress-nginx-controller-$NAMESPACE
  namespace: $NAMESPACE
spec:
  type: LoadBalancer
  #externalTrafficPolicy: Local
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: http
    - name: https
      port: 443
      protocol: TCP
      targetPort: https
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/component: controller
#kubectl apply -f ingress.yaml
#Ajustar DNS en godaddy a 34.217.89.108
EOF
echo "Created.\n"

echo "config\n"


cat <<EOF > $ROOT_PATH/deploy/config
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: $CERTIFICATE_AUTHORITY_DATA
    server: $K8S_SERVER
  name: $K8S_NAME
contexts:
- context:
    cluster: $K8S_CONTEXT_CLUSTER
    user: $K8S_CONTEXT_USER
  name: $K8S_CONTEXT_NAME
current-context: $K8S_CURRENT_CONTEXT
kind: Config
preferences: {}
users:
- name: $K8S_USER_NAME
  user:
$(if [ "$IS_AWS" = "true" ]; then
    echo "    exec:\n      apiVersion: client.authentication.k8s.io/v1alpha1\n      args:\n      - --region\n      - $K8S_USER_REGION\n      - eks\n      - get-token\n      - --cluster-name\n      - $K8S_USER_CLUSTER_NAME\n      command: aws\n      env: null\n      provideClusterInfo: false\n"
    else
    echo "   client-certificate-data: $K8S_USER_CLIENT_CERTIFICATE_DATA \n   client-key-data: $K8S_USER_CLIENT_KEY_DATA \n"
fi)
EOF
echo "Created.\n"

echo "INITIALIZING DEPLOY"
if [ "$SKIP_BUILD" = 0 ]; then
    echo "BUILD\n"
    cd $ROOT_PATH && waypoint up
    else
    echo "SKIPPED BUILD"
fi
echo "FINISHING DEPLOY"

echo "CREATING INGRESS DEPLOY"

kubectl config use-context $K8S_CURRENT_CONTEXT
echo "Current Context: $K8S_CURRENT_CONTEXT"
cd $ROOT_PATH && kubectl apply -f ./deploy/ingress.yaml
echo "APPLIED INGRESS\n"
echo "CREDS FILES"
if [ "$KEEP" = 0 ]; then
    echo "DELETING\n"
    rm -rf $ROOT_PATH/deploy/ingress.yaml
    rm -rf $ROOT_PATH/deploy/dockerAuth.json
    rm -rf $ROOT_PATH/deploy/variables.tf
    rm -rf $ROOT_PATH/deploy/config
    else
    echo "KEEP"
fi

echo "CREDS FILES DELETED"
echo "END"