
function showMsg({title='数据加载失败！',duration=1500,icon='none'}){
    uni.showToast({
      title,
      duration,
      icon
    })
  }
export default showMsg