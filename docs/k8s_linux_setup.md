## Kubernetes Setup for Ubuntu

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
