# 1.CentOS Docker 安装

Docker 支持以下的 64 位 CentOS 版本：

- CentOS 7
- CentOS 8

## 1.1使用官方安装脚本自动安装

安装命令如下：

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

systemctl start docker
```



## 1.2Docker 镜像加速

国内从 DockerHub 拉取镜像有时会遇到困难，此时可以配置镜像加速器，绝味项目使用阿里云镜像加速。

请在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：

```
{"registry-mirrors":["https://mjasr488.mirror.aliyuncs.com"]}
```

之后重新启动服务：

$ **sudo** systemctl daemon-reload
$ **sudo** systemctl restart docker

# 2. CentOS Docker 使用



密码：Wb370sJ&IW6mjN4Aa

## 2.1登录镜像服务

```
$ docker login --username=hx_test01@1086124009805863 jw-harbor-registry.cn-shanghai.cr.aliyuncs.com
$ 输入密码 Wb370sJ&IW6mjN4Aa
```

## 2.2创建阿里镜像仓库

[容器镜像服务 (aliyun.com)](https://cr.console.aliyun.com/cn-shanghai/instance/cri-q0f5rciz8noj8plw/repositories)

用户名 hx_test01@1086124009805863.onaliyun.com
密码     fqnV1K9X5TNmLRcL



## 2.3打包基础镜像sentineljava（仅研发使用）

### 2.2.1创建docker目录

/docker/jar/myjava

准备必要依赖

libHASPJava_x86_64.so

libhasp_linux_x86_64_108669.so

hasp_108669.ini

jdk.tar.gz

### 2.2.2创建docker文件

vi Dockerfile

```
FROM centos:7
MAINTAINER  zjb "zhujianbang@histonetec.com"

ADD jdk.tar.gz /
ADD libHASPJava_x86_64.so /usr/lib64/
ADD libhasp_linux_x86_64_108669.so /usr/lib64/
ADD libhasp_linux_108669.so /usr/lib64/
ADD libHASPJava.so /usr/lib64/
ADD libHASPJava_x86_64.so /usr/lib/
ADD libhasp_linux_x86_64_108669.so /usr/lib/
ADD libhasp_linux_108669.so /usr/lib/
ADD libHASPJava.so /usr/lib/

ADD  hasp_108669.ini /root/.hasplm/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

ENV JAVA_HOME=/usr/java/jdk1.8.0_251/
ENV CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH=$JAVA_HOME/bin:$PATH

ENTRYPOINT ["java","-version"]

```

### 2.2.3生成docker镜像

```
docker build -t sentineljava:centos7_openjdk8 .

```

### 2.2.4查看镜像ID

```
[root@localhost myjdk]# docker images
REPOSITORY           TAG                IMAGE ID       CREATED              SIZE
sentineljava        centos7_openjdk8   8dc1a1abab5e   About a minute ago   620MB

```



### 2.2.5推送至阿里镜像仓库

```
[root@localhost myjdk]# docker login --username=hx_test01@1086124009805863 jw-harbor-registry.cn-shanghai.cr.aliyuncs.com
[root@localhost myjdk]# 输入密码 Wb370sJ&IW6mjN4Aa
[root@localhost myjdk]# docker tag 8dc1a1abab5e jw-harbor-registry.cn-shanghai.cr.aliyuncs.com/jwpos/sentineljava:centos7_openjdk8
[root@localhost myjdk]# docker push jw-harbor-registry.cn-shanghai.cr.aliyuncs.com/jwpos/sentineljava:centos7_openjdk8

```

## 2.4.打包业务镜像（以AIP-Vipsale为例）

### 2.3.1创建docker目录

/docker/jar/aip-vipsale

准备必要依赖

spe-4.21.4_centos-7-amd64_boost.tar.gz (仅aip-rpp使用)

aipvipsale-4.2.1-SNAPSHOT.jar

### 2.3.2创建docker文件

vi Dockerfile

```
FROM jw-harbor-registry.cn-shanghai.cr.aliyuncs.com/jwpos/sentineljava:centos7_openjdk8

#下面这个仅spe需要
#ADD spe-4.21.4_centos-7-amd64_boost.tar.gz /usr/lib64/

WORKDIR /home/app

ADD aipvipsale-4.2.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["sh","-c","java -jar -Dfile.encoding=UTF-8 /home/app/app.jar "]
```

### 2.3.3生成docker镜像

```
[root@localhost myjdk]#docker login --username=hx_test01@1086124009805863 jw-harbor-registry.cn-shanghai.cr.aliyuncs.com
[root@localhost myjdk]#输入密码： Wb370sJ&IW6mjN4Aa
[root@localhost myjdk]#docker build -t  aip-vipsale:V20211126_0 .

```

### 2.3.4查看镜像ID

```
[root@localhost myjdk]# docker images
REPOSITORY           TAG                IMAGE ID       CREATED              SIZE
aip-vipsale          V20211126_0       0e96712e8360   About a minute ago   620MB

```

### 2.3.5推送至阿里仓库

```
[root@localhost myjdk]# 
[root@localhost myjdk]# docker tag 317d62288f3b jw-harbor-registry.cn-shanghai.cr.aliyuncs.com/jwpos/aip-vipsale:V20211126_0
[root@localhost myjdk]# docker push jw-harbor-registry.cn-shanghai.cr.aliyuncs.com/jwpos/aip-vipsale:V20211126_0
```



# 3 发布服务

登录阿里云控制台，使用镜像创建应用或者更新应用。



# 4.附录



## 4.1其他docker命令

1.查看当前运行的所有容器
 docker ps -a
 2.停止所有容器（container），这样才能够删除其中的images：
 docker stop $(docker ps -a -q)
 3.如果想要删除所有容器（container）的话再加一个指令：
 docker rm $(docker ps -a -q)
 4.查看当前有那些镜像（images）
 docker images
 5.删除镜像（images），通过镜像（images）的id来指定删除谁
 docker rmi <image id>
 6.想要删除镜像（images）id为<None>的image的话可以用
 docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
 7.要删除全部镜像（images）的话
 docker rmi $(docker images -q)

1、杀死运行的容器：

 \# docker kill $(docker ps -a -q)

2、删除所有容器：

\# docker rm $(docker ps -a -q)

3、强制删除所有镜像：

\# docker rmi -f $(docker images -q)