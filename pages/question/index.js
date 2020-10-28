Page({
    data: {
        questions:[
            {
                id:1,
                title:'这个小程序怎么玩',
                content:'您可以点击首页"开始猜成语"，找出正确答案，既能学习知识又能赚钱',
            },
            {
                id:2,
                title:'为什么提示我的金币不足',
                content:'亲，猜成语需要消耗金币哦，您可以通过邀请好友，火者观看激励视频获取金币',
            },
            {
                id:3,
                title:'猜成语奖励是什么',
                content:'亲，您随机获取的奖励，可用于兑换商品',
            },
            {
                id:4,
                title:'商品兑换后，如何发货',
                content:'从首页进入"兑换"页面，点击复制客服微信，添加资讯哦',
            },
            {
                id:5,
                title:'这个小程序收费吗',
                content:'不会的，这是一款免费的猜成语小程序，供您休闲娱乐，益智消遣使用',
            },
            {
                id:6,
                title:'还有别的好玩的程序推荐吗',
                content:'点击首页"更多好玩"，会有其他好玩的程序哦',
            },
        ],
        current:0,
    },
    onLoad: function (options) {

    },
    select:function (e) {
        const {id} = e.currentTarget.dataset;
        this.setData({
            current:id,
        })
    },
    back:function () {
        wx.navigateTo({
            url:'/pages/index/index'
        })
    }
});