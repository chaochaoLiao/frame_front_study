/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '超哥'
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'get',
    params: {
        creator
    }
}).then(res => {
    // console.log(res);
    const userObj = res.data.data
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            document.querySelector('.prew').src = userObj[key]
        } else if (key === 'gender') {
            const gName = document.querySelectorAll('.gender')
            const gNum = userObj[key]
            gName[gNum].checked = true
        } else {
            document.querySelector(`.${key}`).value = userObj[key]
        }
    })
    // console.log(userObj);

})


document.querySelector('.upload').addEventListener('change', (e) => {
    const fd = new FormData()
    // console.log(e.target.files[0]);
    fd.append('avatar', e.target.files[0])
    fd.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fd
    }).then(res => {
        // console.log(res);
        document.querySelector('.prew').src = res.data.data.avatar
    })
})


document.querySelector('.submit').addEventListener('click', () => {
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    userObj.gender = +userObj.gender
    // console.log(userObj);
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: {
            ...userObj,
            creator
        }
    }).then(res => {
        const myToast = new bootstrap.Toast(document.querySelector('.my-toast'))
        myToast.show()
        // console.log(res);
    })

})