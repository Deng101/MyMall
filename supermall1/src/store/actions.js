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
      let oldProduct = context.state.cartList.find(item => (item.iid === payload.iid)&&(item.size === payload.size))
      if (oldProduct){
        context.commit('addCounter',oldProduct)
        resolve('添加商品成功！')
      }else {
        payload.count = payload.count
        // context.state.cartList.push(payload)
        context.commit('addTOCart',payload)
        resolve('新添加商品成功')
      }
    })
  },
  //提交登录状态
  changeStatus(context,lgname){
    context.commit('cgloginStatus',lgname)
  },
  delall(context){
    return new Promise((resolve,reject) => {
      context.commit('delall')
      resolve('购物车已清空！')
    })
  },
  delsel(context,arr){
    return new Promise((resolve,reject) => {
      for(let i in arr){
        context.commit('delsel',arr[i])
        console.log(arr[i]);
      }
      resolve('删除成功！')
    })
  },
  addLocation(context,newlocation){
    return new Promise((resolve,reject) => {
      /* newlocation.id = context.state.mylocation.length */
      context.commit('addNewLocation',newlocation)
      resolve('添加成功')
    })
  },
  addNewId(context,newid){
    context.commit('addtestId',newid)
  },
  delLoc(context,index){
    return new Promise((resolve,reject) => {
      /* newlocation.id = context.state.mylocation.length */
      context.commit('delLoc',index)
      resolve('删除成功')
    })
  },
  changelocation(context,newLoc){
    return new Promise((resolve,reject) => {
      /* newlocation.id = context.state.mylocation.length */
      context.commit('udLocation',newLoc)
      resolve('修改成功')
    })

    
  }
}
