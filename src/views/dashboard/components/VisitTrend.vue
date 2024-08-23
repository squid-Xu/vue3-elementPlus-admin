<!--  线 + 柱混合图 -->
<template>
    <el-card>
        <template #header>
            <div class="flex-x-between">
                <div class="flex-y-center">
                    访问趋势
                    <el-tooltip effect="dark" content="点击试试下载" placement="bottom">
                        <i-ep-download class="cursor-pointer hover:color-#409eff ml-1" @click="handleDownloadChart" />
                    </el-tooltip>
                </div>
            </div>
        </template>

        <div :id="id" :class="className" :style="{ height, width }"></div>
    </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

const chart: Ref<echarts.ECharts | null> = ref(null);

const props = defineProps({
    id: {
        type: String,
        default: 'VisitTrend'
    },
    className: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '200px',
        required: true
    },
    height: {
        type: String,
        default: '200px',
        required: true
    }
});

/** 设置图表  */
const setChartOptions = () => {
    if (!chart.value) {
        return;
    }

    const options = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['浏览量(PV)', 'IP'],
            bottom: 0
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2024-08-08', '2024-08-09', '2024-08-10', '2024-08-11', '2024-08-12', '2024-08-13', '2024-08-14', '2024-08-15']
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '浏览量(PV)',
                type: 'line',
                data: [4402, 3845, 1696, 1691, 5140, 5377, 5805, 833],
                areaStyle: {
                    color: 'rgba(64, 158, 255, 0.1)'
                },
                smooth: true,
                itemStyle: {
                    color: '#409EFF'
                },
                lineStyle: {
                    color: '#409EFF'
                }
            },
            {
                name: 'IP',
                type: 'line',
                data: [513, 480, 195, 159, 512, 601, 535, 158],
                areaStyle: {
                    color: 'rgba(103, 194, 58, 0.1)'
                },
                smooth: true,
                itemStyle: {
                    color: '#67C23A'
                },
                lineStyle: {
                    color: '#67C23A'
                }
            }
        ]
    };

    chart.value.setOption(options);
};

/** 下载图表 */
const handleDownloadChart = () => {
    if (!chart.value) {
        return;
    }

    // 获取画布图表地址信息
    const img = new Image();
    img.src = chart.value.getDataURL({
        type: 'png',
        pixelRatio: 1,
        backgroundColor: '#fff'
    });
    // 当图片加载完成后，生成 URL 并下载
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const link = document.createElement('a');
            link.download = `访问趋势.png`;
            link.href = canvas.toDataURL('image/png', 0.9);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };
};

/** 窗口大小变化时，重置图表大小 */
const handleResize = () => {
    setTimeout(() => {
        if (chart.value) {
            chart.value.resize();
        }
    }, 100);
};
/** 初始化图表  */
onMounted(() => {
    // markRaw 作用：标记数据不可变为代理数据
    chart.value = markRaw(echarts.init(document.getElementById(props.id) as HTMLDivElement));
    setChartOptions();

    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

onActivated(() => {
    handleResize();
});
</script>
<style lang="scss" scoped></style>
