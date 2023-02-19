// 本地Mock
import Mock from 'mockjs'
import mall from './mall'
Mock.setup({
  timeout: '300-600'
})

// Mock.mock('/api/users', 'get', function () {
//   return Mock.mock({
//     data: {
//       'data|3': [
//         {
//           name: '@cname',
//           'phone|11': '@integer(0,9)',
//           city: '@city'
//         }
//       ],
//       status: '200',
//       msg: '请求成功'
//     }
//   })
// })

Mock.mock('/api/mall/categorys', 'get', mall.getCategorys)
Mock.mock(/\/api\/mall\/categorys\/\d*/, 'get', mall.getOneCategory)
Mock.mock('/api/mall/banners', 'get', mall.getBanners)
Mock.mock('/api/mall/brand-videos', 'get', mall.getBrandVideos)
Mock.mock(/\/api\/mall\/brand-videos\/\d*/, 'get', mall.getBrandVideosById)
Mock.mock(
  '/api/mall/recommendatory-categorys',
  'get',
  mall.getRecommendatoryCategorys
)
Mock.mock('/api/mall/promotions', 'get', mall.getPromotions)
Mock.mock('/api/mall/hot-categorys', 'get', mall.getHotCategorys)
Mock.mock(/\/api\/mall\/goods\/\d*/, 'get', mall.getCategoryGoods)
Mock.mock(/\/api\/mall\/goods-id\/\d*/, 'get', mall.getGoodsId)
Mock.mock(/\/api\/mall\/goods-detail\/\d*/, 'get', mall.getGoodsDetailById)

export default Mock
