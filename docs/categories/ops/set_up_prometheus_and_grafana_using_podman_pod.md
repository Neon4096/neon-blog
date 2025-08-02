# Podman pod搭建Prometheus+Grafana

想了很久了一直没做pve的监控服务,今天给他完成了.

AI实在太方便了, 给他描述我的需求和环境, 刷刷刷安装教程全出来了, 所以这里只写一些我在安装环境的过程中遇到的问题.

## 部署方案

* Debian12 + Podman Pod
* Prometheus + Grafana

## Prometheus安装

* 问题1: 
  * 本地prometheus-config配置文件名称不规范,本地配置名字叫promethues-pod.yml,错了,改回promethues.yml
  ```docker
  podman run -d --pod monitoring-pod \ 
  --name prometheus \ 
  -v ./prometheus-data:/prometheus:Z \
  -v ./prometheus-config:/etc/prometheus:Z,ro \
  docker.io/prom/prometheus
  ```
  ```log
  time=2025-08-01T15:23:17.631Z level=ERROR source=main.go:638 msg="Error loading config (--config.file=/etc/prometheus/prometheus.yml)" file=/etc/prometheus/prometheus.yml err="open /etc/prometheus/prometheus.yml: no such file or directory"
  ```
* 问题2: 
  * 接着上面的问题,又报了一个权限的问题
  ```log
  time=2025-08-01T15:53:06.295Z level=ERROR source=query_logger.go:113 msg="Error opening query log file" component=activeQueryTracker file=/prometheus/queries.active err="open /prometheus/queries.active: permission denied"
  panic: Unable to create mmap-ed active query log
  ```
  * 这个问题是user namespace的映射问题. rootless下的podman, 容器内的nobody uid是165533
  ```shellscript
  $ podman top -l user huser
  USER        HUSER
  nobody      165533
  ```
  * 处理方式是在原先的pod run命令改一下配置, 给prometheus-data文件夹改权限. 这里的U是podman提供的参数,可以自动处理宿主机文件夹权限
  ```docker
  podman run -d --pod monitoring-pod \ 
  --name prometheus \ 
  -v ./prometheus-data:/prometheus:Z,U \ -- 这里多个U;当然手动chown也可以
  -v ./prometheus-config:/etc/prometheus:Z,ro \
  docker.io/prom/prometheus
  ```


## Node Exporter安装

* 没什么坑.只有AI说的时候让我node-exporter启动时使用宿主机网络,导致用端口映射的prometheus无法连上node(即使他们在一个pod中)

## Grafana安装

* 没有问题, Pass

## 参考

* [Understanding rootless Podman's user namespace modes](https://www.redhat.com/en/blog/rootless-podman-user-namespace-modes)

* [Understanding user namespaces with rootless containers](https://access.redhat.com/articles/5946151)

