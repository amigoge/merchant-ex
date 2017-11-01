var app = new Vue({
    el: '#app',
    mounted: function () {
        this.fetchAllPost();
        eventHandl(this);

        // datepicker的event handler
        function eventHandl(instance) {
            $('.createModal .startDate').datepicker({
                format: 'yyyy/mm/dd',
                startDate: new Date()
            }).on('changeDate', (e)=> {
                instance.createdPost.marketStart = $(e.currentTarget).val()
            });
            $('.createModal .endDate').datepicker({
                format: 'yyyy/mm/dd',
                startDate: new Date()
            }).on('changeDate', (e)=> {
                instance.createdPost.marketEnd = $(e.currentTarget).val()
            });

            $('.updateModal .startDate').datepicker({
                format: 'yyyy/mm/dd',
                startDate: new Date()
            }).on('changeDate', (e)=> {
                instance.selectedPost.marketStart = $(e.currentTarget).val()
            });
            $('.updateModal .endDate').datepicker({
                format: 'yyyy/mm/dd',
                startDate: new Date()
            }).on('changeDate', (e)=> {
                instance.selectedPost.marketEnd = $(e.currentTarget).val()
            });
        }
    },
    data: {
        postList: [],
        selectedPost: {
            title: '',
            content: '',
            city: '台中市',
            marketStart: '',
            marketEnd: ''
        },
        createdPost: {
            title: '',
            content: '',
            city: '台中市',
            marketStart: '',
            marketEnd: ''
        }
    },
    methods: {
        // 撈取所有招商文
        fetchAllPost: function () {
            this.createdPost = {
                title: '',
                content: '',
                city: '台中市',
                marketStart: '',
                marketEnd: ''
            }
            var self = this;
            getPosts().then(function (data) {
                if (data && data.length > 0) {
                    self.postList = data;
                } else {
                    self.postList = []
                }
            }, function (err) {

            })

            // 取得招商資訊
            function getPosts() {
                return $.get('/api/post')
            }
        },
        // 驗證資料
        validation: function (data) {
            if (data.title == '') {
                alert('標題不得為空。');
                return false
            }
            if (data.content == '') {
                alert('內容不得為空。');
                return false
            }

            return true;
        },
        // 顯示新增招商文的modal
        showCreateModal: function () {
            $('.createModal').modal('show');
        },
        // 新增招商資訊
        createPost: function () {
            var self = this;
            if (this.validation(this.createdPost)) {
                addPost(this.createdPost).then(function (data) {
                    console.log(JSON.stringify(data));
                    self.fetchAllPost();
                    $('.createModal').modal('hide');
                }, function (err) {
                    console.log(JSON.stringify(err));
                })
            }
            //
            function addPost(data) {
                return $.post('/api/post', data)
            }
        },
        // 顯示修改招商文的modal
        showUpdateModal: function (id) {
            var target = _.find(this.postList, function (post) {
                return post._id == id;
            })

            target.marketStart = dateFormating(target.marketStart);
            target.marketEnd = dateFormating(target.marketEnd);
            this.selectedPost = target;

            $('.updateModal').modal('show');
        },
        // 更新招商文資訊
        updatePost: function () {
            var self = this;
            if (this.validation(this.selectedPost)) {
                var updatedData = {
                    targetID: this.selectedPost._id,
                    title: this.selectedPost.title,
                    content: this.selectedPost.content,
                    city: this.selectedPost.city
                }
                updatePost(updatedData).then(function (data) {
                    console.log(JSON.stringify(data));
                    self.fetchAllPost();
                    $('.updateModal').modal('hide');
                }, function (err) {
                    console.log(JSON.stringify(err));
                })
            }
            // 更新招商資訊
            function updatePost(data) {
                return $.ajax({
                    url: '/api/post',
                    type: 'PUT',
                    data: data
                })
            }
        },
        // 顯示刪除刪除招商文確認的modal
        showDeleteModal: function (id) {
            var target = _.find(this.postList, function (post) {
                return post._id == id;
            })

            target.marketStart = dateFormating(target.marketStart);
            target.marketEnd = dateFormating(target.marketEnd);
            this.selectedPost = target;

            $('.deleteModal').modal('show');
        },
        // 刪除招商文資訊
        deletePost: function () {
            var self = this;
            deletePost(this.selectedPost._id).then(function (res) {
                console.log(JSON.stringify(res));
                self.fetchAllPost();
                $('.deleteModal').modal('hide');
            }, function (err) {
                console.log(JSON.stringify(err));
            })
            // 刪除招商資訊
            function deletePost(id) {
                return $.ajax({
                    url: '/api/post/' + id,
                    type: 'DELETE'
                })
            }
        },
    },
    filters: {
        dateFormat: function (value) {
            return dateFormating(value);
        }
    }
});
// 進行日期格式轉換
function dateFormating(value) {
    var month = padding(new Date(value).getMonth() + 1);
    var day = padding(new Date(value).getDate());

    return `${new Date(value).getFullYear()}/${month}/${day}`

    function padding(value) {
        var str = '' + value;
        var pad = '00'
        return pad.substring(0, pad.length - str.length) + str;
    }
}