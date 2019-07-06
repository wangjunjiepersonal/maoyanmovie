<template>
	<div id="main">
		<!--头部-->
		<Header title="喵喵电影"></Header>
		<!--主体-->
		<div id="content">
			<!--二级路由导航-->
			<div class="movie_menu">
				<router-link to="/movie/city" tag="div" class="city_name">
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link to="/movie/nowplaying" tag="div"  class="hot_item">正在热映</router-link>
					<router-link to="/movie/comingsoon" tag="div"  class="hot_item">即将上映</router-link>
				</div>
				<router-link to="/movie/search" tag="div"  class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<!--底部-->
		<TabBar></TabBar>
		<router-view name="detail" />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import TabBar from '@/components/TabBar'
	import {messageBox} from '@/components/js'
	
	export default {
		name:'Movie',
		mounted(){
			this.getAddress()
		},
		methods:{
			getAddress(){
				setTimeout(() => {
					this.axios.get('/api/getLocation').then(res => {
						let msg = res.data.msg
						if (msg === 'ok') {
							let nm = res.data.data.nm
							let id = res.data.data.id
							if (this.$store.state.city.id == id) {
								return
							}
							
							messageBox({
								title:'定位',
								content:nm,
								cancel:'取消',
								ok:'切换定位',
								handleOk(){
									window.localStorage.setItem('nowNm',nm)
									window.localStorage.setItem('nowId',id)
									window.location.reload()
								},
							})
						}
					})
				},2000)
			}
		},
		components:{
			Header,
			TabBar
		}
	}
</script>

<style scoped="scoped">
	#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
	.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
	.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
	.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
	.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
	.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
	.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>