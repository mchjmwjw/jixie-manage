<template>
    <div :id="matchart">

    </div>
</template>

<script>
import G2 from 'g2';

// var data = [
//   {genre: 'Sports', sold: 275},
//   {genre: 'Strategy', sold: 115},
//   {genre: 'Action', sold: 120},
//   {genre: 'Shooter', sold: 350},
//   {genre: 'Other', sold: 150},
// ]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
// // Step 1: 创建 Chart 对象
// var chart = new G2.Chart({
// 	id: 'matchart',
// 	width: 600,
// 	height: 300
// });
// // Step 2: 载入数据源
// chart.source(data, {
// 	genre: {
// 		alias: '游戏种类' // 列定义，定义该属性显示的别名
// 	},
// 	sold: {
// 		alias: '销售量'
// 	}
// });
// // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
// chart.interval().position('genre*sold').color('genre');
// // Step 4: 渲染图表
// chart.render();
export default{
	data () {
		return {
			chart: null
		};
	},
	props: {
		charData: {
			type: Array,
			default: function () {
				return {
					data: [{'mzkId': 112, 'strftime': '2017-01-11', 'value': 9275501},  // 测试数据，根据自己需求自己设置数据
						{'mzkId': 112, 'strftime': '2017-01-12', 'value': 9281904},
						{'mzkId': 112, 'strftime': '2017-01-13', 'value': 9290777},
						{'mzkId': 112, 'strftime': '2017-01-14', 'value': 9297913},
						{'mzkId': 112, 'strftime': '2017-01-15', 'value': 9306918},
						{'mzkId': 112, 'strftime': '2017-01-16', 'value': 9315641}]
				};
			}
		},
		matchart: String
	},
	mounted: function () {
	//      this.drawChart();       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
	},
	beforeUpdate: function () {
	//      this.drawChart();
	},
	watch: {
		charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
			console.log('new: %s, old: %s', val, oldVal);
			this.drawChart(val);
		}
	},
	methods: {
		drawChart: function (datas) {
		// 如果图形存在则删除再创建，这个地方感觉稍微有点坑
		// 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
			this.chart && this.chart.destroy();
			let data = datas;
			this.chart = new G2.Chart({
				id: this.id,
				width: 1000,
				height: 250
			});
			this.chart.source(data, {
				strftime: {
					alias: '日期',
					type: 'cat',
					range: [0, 1]
				},
				value: {
					alias: '数量值(人)'
				}
			});
			this.chart.line().position('strftime*value').size(2);
			this.chart.point().position('strftime*value').color('#757373')
				.shape('circle')
				.label('value', {offset: 20, label: {fill: '#000'}});
			this.chart.animate(false);
			this.chart.render();
		}
	}
};
</script>