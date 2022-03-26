export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事情比较单一一点
  addCounter(state,payload){
    payload.count += payload.count
  },
  subCounter(state,payload){
    payload.count --
  },
  addTOCart(state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  //修改登录状态
  cgloginStatus(state,lgname){
    state.log_status = !state.log_status
    state.username = lgname
  },
  /* 删除所有商品 */
  delall(state){
    state.cartList = []
  },
  /* 删除选中商品 */
  delsel(state,i){
    console.log(i);
      state.cartList.splice(i,1)
  },

  /* 用户地址存取 */
  addNewLocation(state,newlocation){
    state.myLocation.push(newlocation)
  },
  addtestId(state,id){
    state.testIndex = id
  },
  delLoc(state,index){
    state.myLocation.splice(index,1)
  },
  udLocation(state,newLoc){
    state.myLocation[state.testIndex] = newLoc
  }
}
