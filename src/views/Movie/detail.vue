<template>
	<div id="detailcontainer">
		<Header title="影片详情">
			<i class="iconfont icon-right" @touchstart="handleToBack"></i>
		</Header>
		<Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('148.200')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}} / {{dur}}</p>
						<p>{{detailMovie.pudDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailMovie.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(ite,index) in detailMovie.photos" :key="index">
						<div>
							<img :src="item | setWH('140.127')" alt="">
						</div>
						<p>陈建斌</p>
						<p>马先勇</p>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	
	import Header from '@/components/Header'
	
	export default {
		name:'detail',
		props:['id'],
		data(){
			return {
				detailMovie:{},
				isLoading:true,
			}
		},
		created(){
			this.getInfo()
		},
		methods:{
			handleToBack(){
				this.$router.back()
			},
			getInfo(){
				this.axios.get(`/api/detailmovie?movieId=${id}`).then(res => {
					let msg = res.data.msg
					if (msg === "ok") {
						this.detailMovie = res.data.data.detailMovie
						this.isLoading = false
						this.$nextTick(() => {
							new Swiper(this.$refs.detail_player,{
								slidesPerView:'auto',
								freeMode:true,
								freeModeSticky:true
							})
						})
					}
				})
			}
		},
		components:{
			Header
		}
	}
</script>

<style scoped="scoped">
	#detailcontainer {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
		width: 100%;
		min-height: 100%;
		background-color: #fff;
	}
	#content.detailcontainer{ display: block; margin-bottom:0;}
	#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
	.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
	.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
	.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
	.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
	.detail_list .detail_list_img img{ width:100%; height: 100%;}
	.detail_list .detail_list_info{ margin-top: 20px;}
	.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
	.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
	
	#content .detail_intro{ padding: 10px;}
	#content .detail_player{ margin:20px;}
	.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
	.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
	.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>