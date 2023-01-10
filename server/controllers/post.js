module.exports = {
    getAllPosts: (req,res) => {
        console.log('getAllPosts')
    },
    getCurrentUserPosts: (req,res) => {
        console.log('get Current user post')
    },
    addPost:(req,res) => {
        console.log('add posts')
    },
    editPost:(req,res) => {
        console.log('edit post')
    },
    deletePost:(req,res) => {
        console.log('delete post')
    }
}