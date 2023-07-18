/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = 'liaocc'
function getBooksList() {
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        method: 'get',
        params: {
            creator
        }
    }).then(res => {
        
        const booksList = res.data.data

        document.querySelector('.list').innerHTML = booksList.map((item, index) => {
            return `<tr>
        <td>${index + 1}</td>
        <td>${item.bookname}</td>
        <td>${item.author}</td>
        <td>${item.publisher}</td>
        <td>
          <span class="del" data-id="${item.id}">删除</span>
          <span class="edit" data-id="${item.id}">编辑</span>
        </td>
      </tr>`
        }).join('')
    })
}
getBooksList()


const addModelDom = document.querySelector('.add-modal')
const addModel = new bootstrap.Modal(addModelDom)
document.querySelector('.add-btn').addEventListener('click',() => {
    const addForm = document.querySelector('.add-form')
    const booksObj = serialize(addForm,{hash:true,empty:true})
    axios({
        url:'http://hmajax.itheima.net/api/books',
        method:'POST',
        data:{
            ...booksObj,
            creator
        }
    }).then(res => {
        console.log(res);
        getBooksList()
        
        addModel.hide()
        addForm.reset()
    })
    
})

document.querySelector('.list').addEventListener('click',(e) => {
        if(e.target.classList.contains('del')){
           const bookId = e.target.dataset.id
            // console.log(bookId);
            axios({
                url:`http://hmajax.itheima.net/api/books/${bookId}`,
                method:'DELETE'
            }).then(res => {
                getBooksList() 
            })
        }
})

const editModel = new bootstrap.Modal(document.querySelector('.edit-modal'))
document.querySelector('.list').addEventListener('click',(e) => {
    if(e.target.classList.contains('edit')){
           editModel.show()
           const booksId = e.target.dataset.id
           axios({
            url:`http://hmajax.itheima.net/api/books/${booksId}`,
            method:'get',

           }).then(res => {
            // console.log(res);
          const  booksObj = res.data.data
        //   document.querySelector('.edit-form .bookname').value = booksObj.bookname
        //   document.querySelector('.edit-form .author').value = booksObj.author
        //   document.querySelector('.edit-form .publisher').value = booksObj.publisher
        const keys = Object.keys(booksObj)
        keys.forEach(key => {
            document.querySelector(`.edit-form .${key}`).value = booksObj[key]
        })
           }).catch(error => {
            // console.log(error);
           })

    }
})
document.querySelector('.edit-btn').addEventListener('click',() => {
    const editForm = document.querySelector('.edit-form')
    const booksObj = serialize(editForm,{hash:true,empty:true})
    axios({
        url:`http://hmajax.itheima.net/api/books/${booksObj.id}`,
        method:'PUT',
        data:{
            ...booksObj,
            creator
        }

    }).then(()=>{
        getBooksList()
    })
    editModel.hide()
})