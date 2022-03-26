export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state){
    return state.cartList
  },
  log_status(state){
    return state.log_status
  },
  myLocation(state){
    return state.myLocation
  },
  testIndex(state){
    return state.testIndex
  }
}
