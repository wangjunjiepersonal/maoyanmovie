<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isLoading"></Loading>
			<Scroll v-else ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="(item,index) in hotList" @tap="handleToCity(item)">{{item.nm}}</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="(item,index) in cityList" :key="index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="(items,i) in item.list" :key="i" @tap="handleToCity(items)">{{items.nm}}</li>
							</ul>
						</div>
					</div>
				</div>
			</Scroll>
		</div>
		<div class="city_index">
			<ul>
				<li @touchstart="handleToindex(index)" v-for="(item,index) in cityList" :key="index">{{item.index}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'City',
		data(){
			return{
				cityList : [],
				hotList : [],
				isLoading:true
			}
		},
		created(){
			let cityList = window.localStorage.getItem('cityList')
			let hotList = window.localStorage.getItem('hotList')
			if (cityList && hotList) {
				this.cityList = JSON.parse(cityList)
				this.hotList = JSON.parse(hotList)
				this.isLoading = false
			}else {
				this.getList()
			}
		},
		methods:{
			//获取数据
			getList(){
				this.axios.get('/api/cityList')	.then(res => {
				let msg = res.data.msg
				if (msg === 'ok') {
					this.isLoading = false
					let data = res.data.data.cities
					let {cityList,hotList} = this.formatCityList(data)
					this.cityList = cityList
					this.hotList = hotList
					window.localStorage.setItem('cityList',JSON.stringify(cityList))
					window.localStorage.setItem('hotList',JSON.stringify(hotList))
				}
			})
			},
			//格式化分类数据
			formatCityList(cities){
				let cityList = []
				let hotList = []
				cities.forEach((item) => {
					//热门城市
					if (item.isHot === 1) {
						hotList.push(item)
					}
					//城市分类
					let firstLetter = item.py.substring(0,1).toUpperCase()
					if (toCom(firstLetter)){
						cityList.push({index:firstLetter,list:[{nm:item.nm,id:item.id}]})
					}else {
						for(let i=0;i<cityList.length;i++){
							if (cityList[i].index === firstLetter) {
								cityList[i].list.push({nm:item.nm,id:item.id})
							}
						}
					}
				})
				//循环判断cityList
				function toCom(firstLetter){
          for(var i=0;i<cityList.length;i++){
              if( cityList[i].index ===  firstLetter){
                  return false;
              }
          }
          return true;
        }
				//排序城市
				cityList.sort((n,m) => {
					if (n.index > m.index) {
						return 1
					}else if (n.index < m.index) {
						return -1
					}else {
						return 0
					}
				})
				return {
					cityList,hotList
				}
//				console.log(cityList,hotList)
//				function toCom(firstLetter){
//					cityList.forEach(item => {
//						if (item.index === firstLetter) {
//							return false
//						}
//						return true
//					})
//				}
				
			},
			//点击右侧字母跳转
			handleToindex(index){
				let h2 = this.$refs.city_sort.getElementsByTagName('h2')
//				this.$refs.city_sort.parentNode.scrollTop = 
				this.$refs.city_list.ToScrollTop(-h2[index].offsetTop)
			},
			//点击选择城市
			handleToCity(item){
				this.$store.commit('CITY_INFO',item)
				window.localStorage.setItem('nowNm',item.nm)
				window.localStorage.setItem('nowId',item.id)
				this.$router.push('/movie/nowplaying')
			}
		}
	}
</script>

<style scoped>
	#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
	.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
	.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
	}
	.city_body .city_hot{ margin-top: 20px;}
	.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
	.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
	.city_body .city_sort div{ margin-top: 20px;}
	.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
	.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
	.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
	.city_body .city_index{ font-size: 14px; width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>