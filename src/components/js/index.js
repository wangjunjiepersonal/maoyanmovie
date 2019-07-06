
//
import Vue from 'vue'
import MessageBox from './MessageBox'

export let messageBox = (function(){
	
	//默认参数
	let defaults = {
		title:'',
		content:'',
		cancel:'',
		ok:'',
		handleCancel:'',
		handleOk:null
	}
	
	let MyComponent = Vue.extend(MessageBox)
	
	//返回配置参数
	return function (options){
		for(let attr in options){
			defaults[attr] = options[attr]
		}

		let vm = new MyComponent({
			el:document.createElement('div'),
			data:{
				title:defaults.title,
				content:defaults.content,
				cancel:defaults.cancel,
				ok:defaults.ok
			},
			methods:{
				handleCancel(){
					defaults.handleCancel && defaults.handleCancel.call(this)
					document.body.removeChild(vm.$el)
				},
				handleOk(){
					defaults.handleOk && defaults.handleOk.call(this)
					document.body.removeChild(vm.$el)
				}
			}
		})
		
		document.body.appendChild(vm.$el)
	}
	
})()
