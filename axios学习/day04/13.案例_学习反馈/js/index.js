/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
axios({
    url: 'http://hmajax.itheima.net/api/province'
}).then(res => {
    console.log(res);
    const pnameStr = res.data.list.map(pname => {
        return `<option value="${pname}">${pname}</option>`
    }).join('')
    document.querySelector('.province').innerHTML = `<option value="">省份</option>` + pnameStr
})

document.querySelector('.province').addEventListener('change', async e => {
    const res = await axios({ url: 'http://hmajax.itheima.net/api/city', params: { pname: e.target.value } })
    const cnameStr = res.data.list.map(cname => { return `<option value="${cname}" data-pname='${e.target.value}'>${cname}</option>` }).join('')
    document.querySelector('.city').innerHTML = `<option value="">城市</option>` + cnameStr
    document.querySelector('.area').innerHTML = '<option value="">地区</option>'

})

document.querySelector('.city').addEventListener('change', async e => {
    const res = await axios({ url: 'http://hmajax.itheima.net/api/area', params: { cname: e.target.value, pname: document.querySelector('.province').value } })
    const anameStr = res.data.list.map(aname => { return `<option value="${aname}">${aname}</option>` }).join('')
    console.log(e.target);
    document.querySelector('.area').innerHTML = `<option value="">地区</option>` + anameStr


})

document.querySelector('.btn-secondary').addEventListener('click', () => {
    const form = document.querySelector('.info-form')
    const data = serialize(form,{hash:true,empty:true})
    axios({url:'http://hmajax.itheima.net/api/feedback',method:'post',data}).then(res =>{
        alert(res.data.message)
    }).catch(error =>{
        alert(error.response.data.message)
    })
})