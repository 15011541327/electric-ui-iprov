const top = [
  {
    id: 'base_data_manager',
    name: 'base_data_manager',
    icon: null,
    title: '系统管理',
    child: [
      {
        id: 'system_data',
        name: 'system_data',
        icon: null,
        title: '系统数据管理'
      }
    ]
  },
  {
    id: 'system',
    name: 'system',
    icon: null,
    title: '日志管理'
  },
  {
    id: 'base',
    name: 'base',
    icon: null,
    title: '基础数据管理'
  }
]
const left = {
  system_data: [
    {
      id: 'menu_data',
      name: 'menu_data',
      icon: null,
      title: '枚举管理',
      path: 'system/menu/menuForIndex'
    }
  ],
  base: [
    {
      id: 'channel',
      name: 'channel',
      icon: 'el-icon-tickets',
      title: '通道管理-集团下发',
      path: 'base/channel/channelForIndex'
    },
    {
      id: 'route',
      name: 'route',
      icon: 'el-icon-tickets',
      title: '路径管理-集团下发',
      path: 'base/route/routeForIndex'
    },
    {
      id: 'settlementChannel',
      name: 'settlementChannel',
      icon: 'el-icon-tickets',
      title: '通道结算方向管理-集团下发',
      path: 'base/settlementChannel/settlementChannelForIndex'
    },
    {
      id: 'settlementModel',
      name: 'settlementModel',
      icon: 'el-icon-tickets',
      title: '结算单模板管理',
      path: 'base/settlementModel/settlementModelForIndex'
    },
    {
      id: 'powerSend',
      name: 'powerSend',
      icon: 'el-icon-tickets',
      title: '电厂及代送管理',
      path: 'base/powerSend/powerSendForIndex'
    },
    {
      id: 'market',
      name: 'market',
      icon: 'el-icon-tickets',
      title: '市场成员管理',
      child: [
        {
          id: 'produceEle',
          name: 'produceEle',
          title: '发电企业',
          path: 'market/produceEle/produceEleForIndex'
        },
        {
          id: 'elePower',
          name: 'elePower',
          title: '电网企业',
          path: 'market/elePower/elePowerForIndex'
        },
        {
          id: 'saleMember',
          name: 'saleMember',
          title: '售电公司',
          path: 'market/saleMember/saleMemberForIndex'
        },
        {
          id: 'powerUser',
          name: 'powerUser',
          title: '电力用户',
          path: 'market/powerUser/powerUserForIndex'
        }
      ]
    },
    {
      id: 'settlement',
      name: 'settlement',
      icon: 'el-icon-tickets',
      title: '交易类型管理-集团下发',
      path: 'base/settlement/settlementForIndex'
    }
  ]
}

export default {
  top,
  left
}
