import Vue from 'vue'
import Router from 'vue-router'
import app from '@/common/system/mian/index.vue'
import home from '@/components/index.vue'
import channel from '@/components/base/channel/channelForIndex.vue'
import route from '@/components/base/route/routeForIndex.vue'
import settlementChannel from '@/components/base/settlementChannel/settlementChannelForIndex.vue'
import settlementModel from '@/components/base/settlementModel/settlementModelForIndex.vue'
import powerSend from '@/components/base/powerSend/powerSendForIndex.vue'
import produceEle from '@/components/market/produceEle/produceEleForIndex.vue'
import elePower from '@/components/market/elePower/elePowerForIndex.vue'
import saleMember from '@/components/market/saleMember/saleMemberForIndex.vue'
import powerUser from '@/components/market/powerUser/powerUserForIndex.vue'
import settlement from '@/components/base/settlement/settlementForIndex.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: app,
      children: [
        {
          path: '/home',
          component: home
        },
        {
          path: '/channel',
          component: channel
        },
        {
          path: 'route',
          component: route
        },
        {
          path: 'settlementChannel',
          component: settlementChannel
        },
        {
          path: 'settlementModel',
          component: settlementModel
        },
        {
          path: 'powerSend',
          component: powerSend
        },
        {
          path: 'produceEle',
          component: produceEle
        },
        {
          path: 'elePower',
          component: elePower
        },
        {
          path: 'saleMember',
          component: saleMember
        },
        {
          path: 'powerUser',
          component: powerUser
        },
        {
          path: 'settlement',
          component: settlement
        }
      ]
    }
  ]
})
