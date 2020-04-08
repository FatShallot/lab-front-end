# lab-front-end
前后端分离的实验室管理系统，基于SpringBoot+Vue

[项目的后端部分](https://github.com/FatShallot/lab-back-end)

[相关文档](http://47.100.44.201:8000/category/front-and-back-end-separation/)

前台使用了
- Vue
- vue-router
- element-ui
- axios

# 项目功能
项目暂定包含以下功能：
- 管理员
    - 所有老师拥有的权限
    - 添加、删除用户
    - 修改用户角色
    - 重置用户密码
- 老师
    - 批准学生请假
    - 审核学生提交的课表
    - 查看学生状态
    - 以天为单位查看学生所有状态的统计时间
- 学生
    - 打卡（只能通过两个按钮来模拟签到签退）
    - 请假
    - 提交课表
- 所有角色
    - 登录退出
    - 修改密码

# 说明
这是一个前后端分离的项目，项目本身并不复杂，完全没有必要写成前后端分离。

做成前后端分离只是为了自己练习用，前后端分离会出现很多使用JSP、Thymeleaf时没有碰到的问题。
比如CORS问题，比如前后端的数据交互问题。

# 界面
## 备份
如果GitHub无法显示，可以到[实验室管理系统界面](http://47.100.44.201:8000/2020/03/17/%e5%ae%9e%e9%aa%8c%e5%ae%a4%e7%ae%a1%e7%90%86%e7%b3%bb%e7%bb%9f%e7%95%8c%e9%9d%a2/)查看

## 登录界面

![Login.png](http://ww1.sinaimg.cn/large/005IGVTXly1gcvu5vx3gzj31hc0smjt1.jpg)

## 主界面

![Home.png](http://ww1.sinaimg.cn/large/005IGVTXly1gd9ib3iu7pj31hc0smgn7.jpg)

# 用户账户界面

![User.png](http://ww1.sinaimg.cn/large/005IGVTXly1gdaklamtasj31hc0smq5i.jpg)

## 学生按月状态统计界面

![学生按月状态统计.png](http://ww1.sinaimg.cn/large/005IGVTXly1gdfhb6mp2dj31hc0sm412.jpg)