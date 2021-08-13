import Axios from 'axios'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { editPostContent } from '../../redux/actions/postsActions'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

const DrawerComp = memo(({ edit, setEdit, editId, editPostContent }) => {
    const [postContentt, setPostContent] = useState('')

    useEffect(() => {
        Axios.get(`/posts/getpost/${editId}/`)
            .then(({ data: { postDetails: { postContent } } }) => {
                setPostContent(postContent)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }, [editId])

    console.log(editId)

    const handleSubmitEdittedPost = (e) => {
        e.preventDefault()
        editPostContent(editId, postContentt)              //edit post indiviDually
        setEdit(false)
    }

    return (
        <div>
            <Drawer anchor="bottom" open={edit} onClose={() => setEdit(false)}>
                <form className="postInd_form" onSubmit={handleSubmitEdittedPost}>
                    <textarea
                        className="postInd_textarea"
                        type="text"
                        onChange={(e) => setPostContent(e.target.value)}
                        value={postContentt}
                    />
                    <button className="postInd_submit_btn">
                        <CreateOutlinedIcon style={{ marginRight: '10px' }} /> Edit
                    </button>
                </form>
            </Drawer>
        </div>
    )
})

export default connect(null, { editPostContent })(DrawerComp);
