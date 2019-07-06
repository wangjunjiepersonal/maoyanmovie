<template>
    <div class="wrapper">
      <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "scroll",
        props : {
          handleToScroll : {
            type : Function,
            default : function () {
            }
          },
          handleToTouchEnd : {
            type : Function,
            default : function () {
            }
          }
        },
        mounted() {
          var scroll = new BScroll('.wrapper',{
            probeType : 2,
            tap : true
          })
          this.scroll = scroll
          scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos)
          })
          scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos)
          })
        },
        methods:{
        	ToScrollTop(y){
        		this.scroll.scrollTo(0,y)
        	}
        }
    }
</script>

<style scoped>
  .wrapper{
    height: 100%;
  }
</style>