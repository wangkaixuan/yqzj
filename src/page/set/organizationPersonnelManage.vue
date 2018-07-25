<template>
  <div>
    <yqzj-Head></yqzj-Head>
    <div class="centre">
      <div style='width:280px;' v-if='ztreeDataSource.length>0'>
        <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :is-open='true' :is-check='true'></vue-ztree>
      </div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import vueZtree from '../../components/vue-ztree.vue'
  export default {
      data(){
          return {
            dataList:[],
            ztreeDataSource:[],
            parentNodeModel:[],//当前点击节点父亲对象
            nodeModel:null, // 当前点击节点对象
          }
      },
    components:{
      vueZtree,
      yqzjHead,
      yqzjFooter
    },
    methods:{
      // 点击节点
      nodeClick:function(m, parent, trees){
        this.treeDeepCopy = trees;
        this.nodeModel = m;  // 当前点击节点对象
        this.parentNodeModel = parent; //当前点击节点父亲对象

        console.log(m);
        console.log(parent);

        // 导航菜单
        this.dataList=[]
        this.findById(this.ztreeDataSource,m.parentId)
        this.dataList= this.dataList.reverse();
        this.dataList.push(m);
      },
      findById: function (data, parentId) {
        var vm = this;
        for (var i = 0; i < data.length; i++) {

          if (parentId == data[i].id) {
            console.log(data[i])
            vm.dataList.push(data[i]);
            vm.findById(vm.ztreeDataSource, data[i].parentId)
            return data[i]
          }
          if (data[i].hasOwnProperty('children')) {
            vm.findById(data[i].children, parentId)
          }
        }
      },
      addGroup: function (model) {
        console.log(this);
      }
    },
    mounted (){
      // 异步获取数据操作
      setTimeout(()=>{
        this.ztreeDataSource = [{
          id:220,
          parentId:0,
          name:"游戏1",
          children:[{
            id:221,
            parentId:220,
            name:"游戏2",
            path:"",
            children:[{
              id:222,
              parentId:221,
              name:"游戏3",
              path:"",
              children:[{
                id:223,
                parentId:222,
                name:"游戏4",
                path:"",
                children:[{
                  id:224,
                  parentId:223,
                  name:"游戏5",
                  path:"",
                  children:[{
                    id:225,
                    parentId:224,
                    name:"游戏6",
                    path:"",
                    children:[{
                      id:226,
                      parentId:225,
                      name:"游戏末节点",
                      path:""
                    }],
                  }],
                }],
              }],
            }],
          }],
          path:"http://www.baidu.com"
        },{
          id:1,
          parentId:0,
          name:"音乐",
          children:[],
          path:"http://www.baidu.com"
        },{
          id:2,
          parentId:0,
          name:"视频",
          children:[{
            id:3,
            parentId:2,
            name:"电影",
            children:[{
              id:4,
              parentId:3,
              name:"国产电影",
              path:""
            },{
              id:5,
              parentId:3,
              name:"好莱坞电影",
              path:""
            },{
              id:6,
              parentId:3,
              name:"小语种电影",
              path:""
            }]
          },{
            id:7,
            parentId:2,
            name:"短片",
            children:[{
              id:9,
              parentId:7,
              name:"电视剧",
              path:""
            },{
              id:10,
              parentId:7,
              name:"短片",
              path:""
            }]
          }],
          path:""
        }]
      },1000);
    }
  }
</script>
<style scoped>
  .centre {
    margin: 75px auto 30px;
    width: 94%;
    min-height: 500px;
    position: relative;
  }
</style>
