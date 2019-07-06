<template>
	<div class="messagebox">
		<h3>{{title}}</h3>
		<p>{{content}}</p>
		<div>
			<div @touchstart="handleCancel">{{cancel}}</div>
			<div @touchstart="handleOk">{{ok}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped="scoped">
	.messagebox{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 200px;
		height: 120px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #fff;
		box-shadow: 3px 3px 3px 3px #ccc;
	}
	.messagebox h3 {
		text-align: center;
		line-height: 40px;
		font-size: 18px
	}
	.messagebox p {
		text-align: center;	
		line-height: 40px;
	}
	.messagebox > div {
		display: flex;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #ccc;
		
	}
	.messagebox > div div{
		flex: 1;
		text-align: center;
		line-height: 30px;
		border-right: 1px solid #ccc;
	}
	.messagebox > div div:last-child{
		border:none;
	}
</style>