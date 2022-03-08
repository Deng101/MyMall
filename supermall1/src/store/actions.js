export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // let oldProduct = null
      // for(let item in state.cartList){
      //   if (item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
      // 查看是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct){
        context.commit('addCounter',oldProduct)
        resolve('商品数量+1')
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addTOCart',payload)
        resolve('添加商品成功')
      }
    })
  },
  //提交登录状态
  changeStatus(context){
    console.log(context);
    context.commit('cgloginStatus')
  }
}
