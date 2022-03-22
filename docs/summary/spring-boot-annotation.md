---
title: 🎉 Springboot常用注解
date: 2022-03-10
categories:
 - 编程之路
tags:
 - 深入理解
 - 编程经验
 - Java框架
---

## 🚗 @Value

### 应用场景

比方说某个接口地址为www.baidu.com，以后可能会变成www.google.com。

因此，如果在代码中写死地址，以后地址变了，就需要改源代码，很烦。

这时候就需要把该地址写在配置文件中，需要改地址的时候直接改配置文件，就不用改源代码了。

### 使用方式

1. 在配置文件(application.yaml)中定义该变量的值。

   ```yaml
   server:
     name: 123
   ```

   > :warning: 在yaml文件中，属性的冒号后面都有个空格，空格后面才是值。属性之间的父子层级关系靠缩进来表示。

2. 在代码中声明类变量，并添加@Value注解

   ```java
   public class Demo {
       @Value("${server.name:www.baidu.com}")
       private String name;
   }
   //server.name后面的冒号，表示给它默认值，当配置文件中不存在server.name时，此时的name就为冒号后面的值:www.baidu.com
   ```

3. @Value注解在项目启动时读取配置文件中的信息，如果不存在，启动就会报错。通常报错：某个field找不到，导致某个Bean没有注入（Inject）

### 注意事项

如果明明代码都对，可就是获取不到值。可能原因如下：

1. yaml文件的名字不对，应该为application.yaml或application.yml。

2. yaml文件的位置不对，应该在resources目录下，并注意resources目录必须mark为项目的Resource Folders

3. 属性名的大小写问题。

4. yaml代码书写格式问题。

5. 如果读取配置中心的配置文件，如nacos配置中心，请检查请求的nacos配置中心的地址是否正确。nacos上的配置文件是否已经添加了该属性。

   

## 🚓 @ConfigurationProperties

### 应用场景

当配置文件中存在大量以相同字符开头的配置项的时候，为避免使用@Value注解一个一个地获取，代码不美观，书写繁琐。

可以以一个配置类的方式来获取这些配置项。

### 使用方式

附该注解的官方文档：[Spring@ConfigurationProperties官方指导](https://docs.spring.io/spring-boot/docs/2.3.2.RELEASE/reference/html/appendix-configuration-metadata.html#configuration-metadata-annotation-processor)

1. 使用之前需要引入以下依赖。复制下面代码粘贴到POM文件中，Reimport一下（快捷键Ctrl+Shift+O）即可导入。

> :warning:如果不引入，IDE会检测到错误：**Spring Boot Configuration Annotation Processor not configured**.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

2. 编写配置类

   1. 起名为XXXConfig

   2. 在该类上添加@Configuration注解，用@Component也行，两个是一样的，只不过@Configuration表明这是一个配置，@Component只表明这是个组件。

   3. 添加@ConfigurationProperties注解，配置它的prefix为你写的配置前缀，这里假设你想读取的所有配置项都是以xxx开头的，需要保证XXXConfig类中的属性名与yaml配置文件中的配置项的名字一致。

      ```yaml
      xxx:
        address: https://baidu.com
        openId: 7107
        openKey: YXrsRE
        grantCode: ebd
      ```

   ```java
   import lombok.Data;
   import org.springframework.boot.context.properties.ConfigurationProperties;
   import org.springframework.context.annotation.Configuration;
   
   @Configuration
   @ConfigurationProperties(prefix = "xxx")
   @Data
   public class XXXConfig {
       private String address;
       private String openId;
       private String openKey;
       private String grantCode;
   }
   ```

   4. 添加@Data注解

      添加@Data注解的目的是：添加get、set方法。使用@Data前提：POM中导入了lombok的依赖，IDE安装了lombok 的插件。

      你也可以不用添加@Data注解，直接添加get、set方法。

3. 在需要的地方使用该配置类

   ```java
       @Autowired
       private XXXConfig xxxConfig;
       
       public void test() {
           String address = xxxConfig.getAddress();
       }
   ```

### 嵌套使用

对于多层配置，可以嵌套读取配置，使用方法同上，很简单。

使用方法举例：

1. 在ServerProperties类中添加一个新的属性private Host host；
2. 属性名“host”与配置项中server.host的“host”保持一致。
3. 在ServerProperties类中新增一个静态内部类Host。
4. 为静态内部类Host添加get、set方法（可以用@Data注解）
5. 完成

```yaml
server:
  name: 123
  host:
    ip: 192.168.1.1
    port: 8080
```

```java
@Configuration
@ConfigurationProperties(prefix="server")
@Data
public class ServerProperties {

    private String name;

    private Host host;
    
	@Data
    public static class Host {

        private String ip;

        private int port;

    }
}
```



> :sunflower: 可以不断嵌套，只需要在静态内部类一层一层地添加新的静态内部类，并为每个类添加上get、set方法即可完成多层嵌套



### 特点

@ConfigurationProperties注解在项目开始启动的时候，如果配置类中有的属性，在配置文件中没有的，并不会报错。

@Value注解就不同，如果配置文件中没有，你又没给它默认值，项目启动的时候就会报错。通常报错：某个field找不到，导致某个Bean没有注入（Inject）

### 优化

因为spring-boot-configuration-processor这个jar文件只需要在编译时期起作用，编译完成后，运行时期就用不到它了。

因此，需要在打包前排除掉这个jar文件，减少打包后的整个项目jar文件的大小。

方法：在pom文件中添加以下代码，如果已经存在build或plugins等标签，需要在把其他部分复制粘贴到对应的标签下即可。

exclude意为排除。

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.springframework.boot</groupId>
                            <artifactId>spring-boot-configuration-processor</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```





