<template>
  <div>
    <div id="header_bar">
       <div id="header_userInfo">管理员：{{$store.state.adminuser.admin}}</div>
       <div id="header_title">汽车总装车间</div>
       <div id="header_action">
           <button class="btn btn-warning" @click="$router.push('/')">退出登录</button>
       </div>
    </div>

    <div id="body_bar">
        <div id="left_bar">
            <div id="left_container">
                <ul>
                    <li>
                        <button 
                        @click="a_container1=!a_container1,
                        a_container2=false,
                        a_container3=false,
                        a_container4=false" class="btn btn-default btn-lg btn-block self-set" type="button">员工信息</button>
                        <div :class="{show_detaile: !a_container1}" id="a_container1">
                            <router-link to="/admin/allworks">所有员工</router-link>
                            <router-link to="/admin/addwork">添加员工</router-link>
                            <router-link to="/admin/delwork">删除员工</router-link>
                            <router-link to="/admin/updwork">更新信息</router-link>
                        </div>
                    </li>
                    <li>
                        <button @click="a_container2=!a_container2,
                        a_container1=false,
                        a_container3=false,
                        a_container4=false" class="btn btn-default btn-lg btn-block self-set" type="button">组件信息</button>
                        
                        <div :class="{show_detaile: !a_container2}" id="a_container2">
                            <router-link to="/admin/parts">组件库存</router-link>
                        </div>
                    </li>
                    <li>
                        <button @click="a_container3=!a_container3,
                        a_container1=false,
                        a_container2=false,
                        a_container4=false" class="btn btn-default btn-lg btn-block self-set" type="button">汽车信息</button>
                        
                        <div :class="{show_detaile: !a_container3}" id="a_container3">
                            <router-link to="/admin/cars">车辆库存</router-link>
                            <router-link to="/admin/installcar">组装车辆</router-link>
                        </div>
                    </li>
                    <li>
                        <button @click="a_container4=!a_container4,
                        a_container1=false,
                        a_container2=false,
                        a_container3=false" class="btn btn-default btn-lg btn-block self-set" type="button">订单信息</button>
                        
                        <div :class="{show_detaile: !a_container4}" id="a_container4">
                            <router-link to="/admin/carorder">汽车订单</router-link>
                            <router-link to="/admin/partorder">组件订单</router-link>
                            <router-link to="/admin/allorder">所有订单</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="right_bar">
            <router-view id="main_body"></router-view>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            a_container1: false,
            a_container2: false,
            a_container3: false,
            a_container4: false,
        }
    }

}
</script>

<style lang="less">
#admin_height(){
    header_bar:40px;
}
#admin_width(){
    header_bar:100%;
    left_nav:15%;
    right_nav:85%;
}
#back_color(){
    header_bar: rgb(238, 201, 201);
    body_bar:rgb(207, 235, 235);
    body_right_bar:rgb(140, 191, 240);
    main_body:oldlace;
}
#movein_color(){
    left_container: rgb(157, 227, 240);
    left_select: rgb(122, 220, 245);
}
    #header_bar{
        @font-size: 20px;
        height: #admin_height[header_bar];
        background: #back_color[header_bar];
        box-shadow: 0 0 10px 5px  #back_color[header_bar];
        z-index: 3;
        position: relative;
        font-size:@font-size;
        #header_userInfo,#header_title,#header_action{
            position: absolute;
            top:0;
            bottom:0;
            height: 30px;
            margin-top: auto;
            margin-bottom:auto;
        }
        #header_userInfo{
            left: 50px;
        }
        #header_title{
            left:0;
            right: 0;
            width: 150px;
            margin-right: auto;
            margin-left: auto;
        }
        #header_action{
            right: 50px;
        }
    }

    #body_bar{
        height: 100%;
        display: flex;

        #left_bar{
            width: #admin_width[left_nav];
            background:#back_color[body_bar];
            box-shadow: 0 0 10px 5px #back_color[body_bar];
            z-index: 2;
            #left_container{
                height: 100%;
                width: 75%;
                margin: 30px auto;

                ul>li{
                    margin: 10px 0;
                    transition: all 0.5s;

                    &{
                        border-radius: 10px;
                    }

                    &:hover{
                        background: #movein_color[left_container];
                        box-shadow: 0 0 10px 10px #bfa;
                    }

                    .self-set{
                        text-align: start;
                        padding: 5px;
                    }
                    #a_container1,#a_container2,#a_container3,#a_container4{
                        overflow: hidden;
                        transition: .5s;
                    }
                    #a_container1{
                        height: 100px;
                    }
                    #a_container2{
                        height: 25px;
                    }
                    #a_container3{
                        height: 50px;
                    }
                    #a_container4{
                        height: 75px;
                    }

                    a{
                        display: block;
                        margin: 5px 0;
                        padding: 0 10px;
                        text-decoration: none;
                        &:hover{
                            background: #movein_color[left_select];
                        }
                    }
                }
            }
        }
        #right_bar{
            background: #back_color[body_right_bar];
            width: #admin_width[right_nav];

            #main_body{
                display: block;
                width: 90%;
                height: 100%;
                margin: 20px auto;
                background: #back_color[main_body];
                box-shadow:0 0 10px 5px #back_color[main_body];
            }
        }
    }

    //动态加载自选项
    .show_detaile{
        height: 0 !important;
    }
</style>