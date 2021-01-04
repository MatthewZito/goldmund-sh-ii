## Kubernetes Dev Guide

1. [Install Docker](https://docs.docker.com/get-docker/) (this step will soon be deprecated as images become available on DockerHub)
2. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
    1. On macos' Docker Desktop simply go to `settings -> kubernetes -> enable kubernetes`
    2. If using Linux, see the above link to install minikube - if using Ubuntu, refer to [the steps below](#ubuntu)
3. Install [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)

## <a name="ubuntu"></a> Minikube Setup for Ubuntu

1. Install `kubectl`:
```
snap install kubectl --classic
```

2. Verify installation:
```
kubectl version --client
```

3. Install `conntrack` (required since k8s v1.20.0)
```
sudo apt-get install -y conntrack
```

4. Install `minikube` and add execute permissions:
```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
&& chmod +x minikube
```

5. Add `minikube` to PATH:
```
sudo mkdir -p /usr/local/bin/
sudo install minikube /usr/local/bin/
```

6. Verify installation:
```
minikube status
```

### Installing Ingress and a HyperVisor

1. Install `virtualbox`:
```
sudo apt install virtualbox virtualbox-ext-pack
```

2. Launch minikube with the virtualbox hypervisor:
```
minikube start --driver=virtualbox
```

3. Install `ingress-nginx`:
```
minikube addons enable ingress
```
