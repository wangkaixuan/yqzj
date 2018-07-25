<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{title}} <span class="close" @click="closeMask">&times</span></div>
            <div class="content" v-html="content"></div>
            <div class="btns">
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
                <div v-if="type != 'danger'" class="default-btn" @click="closeBtn">
                    {{cancelText}} {{line}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '保存'
        },
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.closeMask();
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            min-width: 560px;
            max-width: 840px;
            max-height: 352px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 6px;

            .dialog-title{
                width: 100%;
                height: 60px;
                font-size: 16px;
                color: #333333;
                font-weight: 600;
                padding: 0 30px;
                box-sizing: border-box;

                height: 48px;
                line-height: 48px;
                border-bottom: 1px solid #e6e6e6;
                position: relative;

                .close {
                    position: absolute;
                    right: 30px;
                    top: 0;
                    font-size: 24px;
                    color: #686868;
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
            .content{
                color: #797979;
                line-height: 26px;
                padding: 30px 30px 0;
                box-sizing: border-box;
            }
            .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                //width: 100%;
                //position: absolute;
                //bottom: 0;
                //left: 0;
                text-align: center;
                padding: 18px 0;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 6px;
                    
                    cursor: pointer;

                    width: 120px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                }
                .default-btn{
                    color: #666666;
                    background: #ffffff;
                    border: 1px solid #bbbbbb;
                    margin-left: 20px;
                    &:hover{
                        //color: #509EE3; 
                    }
                }
                .danger-btn{
                    color: #fff;
                    background: #33a7ff;
                    border: 1px solid #33a7ff;
                    
                    &:hover{
                        //background: rgb(224, 135, 135);
                    }
                    &:active{
                        //background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #fff;
                    background: #33a7ff;
                    border: 1px solid #33a7ff;
                    &:hover{
                       // background: #6FB0EB;
                    }
                }
                &.bor-top {
                    border-top: 1px solid #e6e6e6;
                }
            }
        }
    }
</style>