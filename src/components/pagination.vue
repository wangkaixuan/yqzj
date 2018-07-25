<template>
  <nav aria-label="Page navigation">
    <div class="separate_page">
      <div class="link_url">
        <a href="javascript:;" @click="prePage()" aria-label="Previous">
          <span aria-hidden="true">&lt;</span>
        </a>
        <a v-for="page in showPageBtn" :class="{hover:page==current}" href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a><a href="javascript:;" class="more" v-else>···</a><a href="javascript:;" @click="nextPage()" aria-label="Next" class="next">
        <span aria-hidden="true">&gt;</span></a> <span class="total_num">共{{pages}}页</span>
      </div>
      <div class="jump_page"><input type="text" name="page" value="1"/><span class="sure_btn" @click="skipPage()">确定</span></div>
    </div>
  </nav>
</template>
<script>
  export default {
    data(){
        return {}
    },
    props:{pages: {type: Number, default: 1}, current: {type: Number, default: 1}},
    computed: {
      showPageBtn(){
        var pageNum = this.pages;
        var index = this.current;
        var arr = [];
        if (pageNum <= 5) {
          for (var i = 1; i <= pageNum; i++) {
            arr.push(i)
          }
          return arr
        }
        if (index <= 2)return [1, 2, 3, 0, pageNum];
        if (index >= pageNum - 1)return [1, 0, pageNum - 2, pageNum - 1, pageNum];
        if (index === 3)return [1, 2, 3, 4, 0, pageNum];
        if (index === pageNum - 2)return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
        return [1, 0, index - 1, index, index + 1, 0, pageNum]
      }
    },
    methods: {
      prePage(){
        let index = this.current
        if (this.current != 1) {
          index--;
          this.$emit('navpage',index)
        } else {
          alert("已经是第一页了")
        }
      }, nextPage(){
        let index = this.current
        if (this.current != this.pages) {
          index++;
          this.$emit('navpage', index)
        } else {
          alert("已经是最后一页了")
        }
      }, goPage(index){
        if (index !== this.current) {
          //this.current = index;
          this.$emit('navpage', index)
        }
      },skipPage(){
        var index = $('[name=page]').val();
        if (index == this.current) {
          return false;
        }
        var intReg = /^[1-9]\d*$/;   //正整数
        if(!intReg.test(index)){     //判断整数输入框 非整数
          alert('请输入正确的页数！');
          return false;
        };
        if(index > this.pages){
          index = this.pages
          $('[name=page]').val(index);
        }
        if(index){
          this.$emit('navpage', index);
        }
      }
    }
  }
</script>
<style>
  .separate_page {padding: 30px 0;text-align: center;height: 36px;line-height: 36px;font-size: 0;}
  .separate_page .link_url,.separate_page .jump_page {display: inline-block;}
  .separate_page .link_url a{box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;
    display: inline-block;width: 36px;height: 36px;border: 1px solid #e5e5e5;border-radius: 6px;color: #999999;font-size: 14px;margin-right: 8px; }
  .separate_page .link_url a.hover,
  .separate_page .link_url a:hover {background: #33a7ff;color: #fff;border: 1px solid #33a7ff;}
  .separate_page .link_url a.next {margin-right: 0;}
  .separate_page .link_url a.more {border:none;}
  .separate_page .link_url .total_num {color: #333;font-size: 14px;margin: 0 10px;}
  .separate_page .jump_page {box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;width: 110px;height: 36px;border: 1px solid #e5e5e5;border-radius: 6px;}
  .separate_page .jump_page input {outline: none;border: none;width: 44px;height: 32px;padding: 0 6px;font-size: 14px;}
  .separate_page .jump_page input:focus {border: none;}
  .separate_page .jump_page .sure_btn {display: inline-block;width: 40px;cursor: pointer;font-size: 14px;}
</style>
